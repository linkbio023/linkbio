import useSWR from "swr";
import { apiUrls } from "@/constants/api-urls";
import { fetchData, fetchMethods } from "@/lib/fetch-data";
import { toast } from "sonner";
import { useEffect, useMemo } from "react";
import {
  AnalyticsDTO,
  BrowserAnalyticsDTO,
  CountryAnalyticsDTO,
  DateAnalyticsDTO,
  OsAnalyticsDTO,
  RefererAnalyticsDTO,
} from "@/DTO/analytics";
import { datesBetweenRange } from "@/lib/date/dates-between-range";
import { getFullCountryName } from "@/lib/get-country-name";

// Get the analytics data
export function useGetAnalyticsData(id) {
  async function getAnalyticsData(url) {
    return fetchData(url, fetchMethods.GET);
  }

  const url = `${apiUrls.analytics.biolink.view}${id}`;

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url,
    getAnalyticsData,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (error) {
      toast.error(data?.message);
    }
  }, [error, data]);

  const receivedData = data?.data;

  // Country analytics to DTO
  const countries = receivedData?.countries.map((country) =>
    new CountryAnalyticsDTO()
      .setCountry(getFullCountryName(country?.country || "Unknown"))
      .setCount(country?.count)
      .setFlag(
        `https://flag.vercel.app/m/${
          country?.country == ("Unknown" || null) ? "AQ" : country?.country
        }.svg`
      )
      .build()
  );

  // Browser analytics to DTO
  const browsers = receivedData?.browsers.map((browser) =>
    new BrowserAnalyticsDTO()
      .setBrowser(browser?.browser)
      .setCount(browser?.count)
      .build()
  );

  // OS analytics to DTO
  const os = receivedData?.os.map((os) =>
    new OsAnalyticsDTO().setOs(os?.os).setCount(os?.count).build()
  );

  // Referrer analytics to DTO
  const referer = receivedData?.referer?.map((referer) =>
    new RefererAnalyticsDTO()
      .setReferer(referer?.referer)
      .setCount(referer?.count)
      .build()
  );

  // Date analytics to DTO
  const startDate = receivedData?.startDate;
  const endDate = receivedData?.endDate;
  const receivedDate = receivedData?.date;

  const date = useMemo(() => {
    // Get all dates between the start and end date
    const datesRange = datesBetweenRange(
      new Date(startDate),
      new Date(endDate)
    );

    // Map the dates and check if the date exists in the received data date then show the count otherwise show 0
    return datesRange.map((date) => {
      const dateExists = receivedDate.find(
        (d) => new Date(d?.date).toDateString() === date.toDateString()
      );
      // Create the DateAnalyticsDTO
      return new DateAnalyticsDTO()
        .setDate(date)
        .setCount(dateExists?.count || 0)
        .build();
    });
  }, [startDate, endDate, receivedDate]);

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

  return { analytics, error, isLoading, isValidating, mutate };
}
