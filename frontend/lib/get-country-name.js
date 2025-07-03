export function getFullCountryName(countryCode) {
  if (countryCode !== ("Unknown" || null)) {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode);
  } else {
    return countryCode;
  }
}
