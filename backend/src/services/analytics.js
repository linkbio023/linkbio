import { UAParser } from "ua-parser-js";
import { roles } from "../constants/roles.js";
import models from "../models/index.js";
import getCountryLookup from "../loaders/maxmind.js";
import {
  AnalyticsDTO,
  BrowserAnalyticsDTO,
  CountryAnalyticsDTO,
  DateAnalyticsDTO,
  OsAnalyticsDTO,
  RefererAnalyticsDTO,
} from "../DTO/analytics.js";

// Create biolink analytics
// Create a new biolink analytics entry

async function createBiolinkAnalytics(data, userAgent, ipAddress) {
  const { biolinkId, referer } = data;

  // Parse the user agent to get the browser and OS
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser().name;
  const os = parser.getOS().name;

  // Get the country based on the IP address
  const countryLookup = await getCountryLookup();
  const country = countryLookup.get(ipAddress)?.country?.iso_code;

  // Get the referrer domain
  const refererUrl = new URL(referer);
  const refererDomain = refererUrl?.hostname;

  const metadata = {
    browser: browser,
    os: os,
    country: country,
    referer: refererDomain,
  };

  // Create the biolink analytics entry
  await models.biokinkAnalytics.create({
    biolink: biolinkId,
    metadata: metadata,
  });
}

// Create link analytics
// Create a new link analytics entry

async function createLinkAnalytics(data, userAgent, ipAddress) {
  const { link } = data;
  const parser = new UAParser(userAgent);
  const browser = parser.getBrowser()?.name;
  const os = parser.getOS()?.name;

  const countryLookup = await getCountryLookup();
  const country = countryLookup.get(ipAddress)?.country?.iso_code;

  const metadata = {
    browser,
    os,
    country,
  };

  await models.linkAnalytics.create({ link, metadata });
}

// Get biolink analytics
// Admin can get any biolink analytics
// Users can only get their own biolink analytics

async function viewBiolinkAnalytics(id, currentUser) {
  // Find the biolink
  // Check if the user is the owner of the biolink
  // If not, Not Found
  // Admin can view any biolink analytics
  // User can only view their own biolink analytics
  // Aggregate the biolink analytics based on country, browser, and OS

  const biolink = await models.biolink.findById(id);

  if (!biolink) {
    const error = new Error("Biolink not found");
    error.statusCode = 404;
    throw error;
  }

  if (
    currentUser.role !== roles.ADMIN &&
    biolink.user.toString() !== currentUser.id.toString()
  ) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }
  // date range is 30 days
  const startDate = new Date(new Date().setDate(new Date().getDate() - 30));
  const endDate = new Date();

  const biolinkAnalytics = await models.biokinkAnalytics.aggregate([
    {
      $match: {
        biolink: biolink._id,
        timestamp: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $facet: {
        countries: [
          {
            $group: {
              _id: "$metadata.country",
              count: { $sum: "$clicks" },
            },
          },
          {
            $project: {
              _id: 0,
              country: "$_id",
              count: 1,
            },
          },
        ],
        browsers: [
          {
            $group: {
              _id: "$metadata.browser",
              count: { $sum: "$clicks" },
            },
          },
          {
            $project: {
              _id: 0,
              browser: "$_id",
              count: 1,
            },
          },
        ],
        os: [
          {
            $group: {
              _id: "$metadata.os",
              count: { $sum: "$clicks" },
            },
          },
          {
            $project: {
              _id: 0,
              os: "$_id",
              count: 1,
            },
          },
        ],
        referer: [
          {
            $group: {
              _id: "$metadata.referer",
              count: { $sum: "$clicks" },
            },
          },
          {
            $project: {
              _id: 0,
              referer: "$_id",
              count: 1,
            },
          },
        ],
        date: [
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$timestamp",
                },
              },
              count: { $sum: "$clicks" },
            },
          },
          {
            $project: {
              _id: 0,
              date: "$_id",
              count: 1,
            },
          },
          {
            $sort: {
              date: 1,
            },
          },
        ],
      },
    },
  ]);

  const analyticsData = biolinkAnalytics[0];

  // Country analytics to DTO
  const countries = analyticsData.countries.map((country) =>
    new CountryAnalyticsDTO()
      .setCountry(country.country)
      .setCount(country.count)
      .build()
  );

  // Browser analytics to DTO
  const browsers = analyticsData.browsers.map((browser) =>
    new BrowserAnalyticsDTO()
      .setBrowser(browser.browser)
      .setCount(browser.count)
      .build()
  );

  // OS analytics to DTO
  const os = analyticsData.os.map((os) =>
    new OsAnalyticsDTO().setOs(os.os).setCount(os.count).build()
  );

  // Referer analytics to DTO
  const referer = analyticsData.referer.map((referer) =>
    new RefererAnalyticsDTO()
      .setReferer(referer.referer)
      .setCount(referer.count)
      .build()
  );

  // Date analytics to DTO
  const date = analyticsData.date.map((date) =>
    new DateAnalyticsDTO().setDate(date.date).setCount(date.count).build()
  );

  // Create the analytics DTO
  const analytics = new AnalyticsDTO()
    .setCountries(countries)
    .setBrowsers(browsers)
    .setOs(os)
    .setReferer(referer)
    .setDate(date)
    .setStartDate(startDate)
    .setEndDate(endDate)
    .build();

  return analytics;
}

// Get link analytics
// Admin can get any link analytics
// Users can only get their own link analytics

async function viewLinkAnalytics(id, currentUser) {
  // Find the link
  // get the biolink associated with the link
  // Check if the user is the owner of the biolink
  // If not, Not Found
  // Admin can view any link analytics
  // Aggregate the link analytics based on country, browser, and OS and date

  const link = await models.link.findById(id);

  if (!link) {
    const error = new Error("Link not found");
    error.statusCode = 404;
    throw error;
  }

  const biolink = await models.biolink.findById(link.biolink);

  if (
    currentUser.role !== roles.ADMIN &&
    biolink.user.toString() !== currentUser._id
  ) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  // date range is 30 days
  const startDate = new Date(new Date().setDate(new Date().getDate() - 30));
  const endDate = new Date();

  const linkAnalytics = await models.linkAnalytics.aggregate([
    {
      $match: {
        link: link._id,
        timestamp: {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $facet: {
        countries: [
          {
            $group: {
              _id: "$metadata.country",
              count: { $sum: "$clicks" },
            },
          },
          {
            $project: {
              _id: 0,
              country: "$_id",
              count: 1,
            },
          },
        ],
        browsers: [
          {
            $group: {
              _id: "$metadata.browser",
              count: { $sum: "$clicks" },
            },
          },
          {
            $project: {
              _id: 0,
              browser: "$_id",
              count: 1,
            },
          },
        ],
        os: [
          {
            $group: {
              _id: "$metadata.os",
              count: { $sum: "$clicks" },
            },
          },
          {
            $project: {
              _id: 0,
              os: "$_id",
              count: 1,
            },
          },
        ],
        date: [
          {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$timestamp",
                },
              },
              count: { $sum: "$clicks" },
            },
          },
          {
            $project: {
              _id: 0,
              date: "$_id",
              count: 1,
            },
          },
          {
            $sort: {
              date: 1,
            },
          },
        ],
      },
    },
  ]);

  return linkAnalytics;
}

export default {
  createBiolinkAnalytics,
  createLinkAnalytics,
  viewBiolinkAnalytics,
  viewLinkAnalytics,
};
