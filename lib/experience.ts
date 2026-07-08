// Single source of truth for years of experience. Computed from the career
// start year so the number rolls over on its own (2020 -> 6 in 2026, 7 in 2027)
// and never needs manual editing across the site.

export const getYearsExperience = () =>
  Math.max(1, new Date().getFullYear() - 2020);
