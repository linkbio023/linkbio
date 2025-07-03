import { paths } from "geolite2";
import { open } from "maxmind";

export default async function getCountryLookup() {
  // If countryLookup is already loaded, return it
  // If countryLookup is not loaded, load it

  const countryLookup = await open(paths.country, {
    watchForUpdates: true,
  });

  return countryLookup;
}
