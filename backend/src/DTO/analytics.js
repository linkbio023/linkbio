export class AnalyticsDTO {
  constructor() {
    this.countries = null;
    this.browsers = null;
    this.os = null;
    this.date = null;
    this.referer = null;
    this.startDate = null;
    this.endDate = null;
  }

  setCountries(countries) {
    this.countries = countries;
    return this;
  }

  setBrowsers(browsers) {
    this.browsers = browsers;
    return this;
  }

  setOs(os) {
    this.os = os;
    return this;
  }

  setDate(date) {
    this.date = date;
    return this;
  }

  setReferer(referer) {
    this.referer = referer;
    return this;
  }

  setStartDate(startDate) {
    this.startDate = startDate;
    return this;
  }

  setEndDate(endDate) {
    this.endDate = endDate;
    return this;
  }

  build() {
    return {
      countries: this.countries,
      browsers: this.browsers,
      os: this.os,
      date: this.date,
      referer: this.referer,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}

export class CountryAnalyticsDTO {
  constructor() {
    this.country = null;
    this.count = null;
  }

  setCountry(country) {
    this.country = country;
    return this;
  }

  setCount(count) {
    this.count = count;
    return this;
  }

  build() {
    return {
      country: this.country,
      count: this.count,
    };
  }
}

export class BrowserAnalyticsDTO {
  constructor() {
    this.browser = null;
    this.count = null;
  }

  setBrowser(browser) {
    this.browser = browser;
    return this;
  }

  setCount(count) {
    this.count = count;
    return this;
  }

  build() {
    return {
      browser: this.browser,
      count: this.count,
    };
  }
}

export class OsAnalyticsDTO {
  constructor() {
    this.os = null;
    this.count = null;
  }

  setOs(os) {
    this.os = os;
    return this;
  }

  setCount(count) {
    this.count = count;
    return this;
  }

  build() {
    return {
      os: this.os,
      count: this.count,
    };
  }
}

export class RefererAnalyticsDTO {
  constructor() {
    this.referer = null;
    this.count = null;
  }

  setReferer(referer) {
    this.referer = referer;
    return this;
  }

  setCount(count) {
    this.count = count;
    return this;
  }

  build() {
    return {
      referer: this.referer,
      count: this.count,
    };
  }
}

export class DateAnalyticsDTO {
  constructor() {
    this.date = null;
    this.count = null;
  }

  setDate(date) {
    this.date = date;
    return this;
  }

  setCount(count) {
    this.count = count;
    return this;
  }

  build() {
    return {
      date: this.date,
      count: this.count,
    };
  }
}
