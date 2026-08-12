import locationsData from "@/data/locations.json";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCountryData(countryParam: string) {
  const normalizedCountry = slugify(countryParam);
  const data = locationsData as Record<string, any>;

  const countryKey = Object.keys(data).find(
    (key) => slugify(key) === normalizedCountry
  );

  if (!countryKey || !data[countryKey]) {
    return null;
  }

  return data[countryKey];
}

export function getStateData(countryParam: string, stateParam: string) {
  const countryData = getCountryData(countryParam);
  if (!countryData || !countryData.states) {
    return null;
  }

  const normalizedState = slugify(stateParam);
  const stateKey = Object.keys(countryData.states).find(
    (key) => slugify(key) === normalizedState
  );

  if (!stateKey || !countryData.states[stateKey]) {
    return null;
  }

  return {
    countryData,
    stateData: countryData.states[stateKey]
  };
}
