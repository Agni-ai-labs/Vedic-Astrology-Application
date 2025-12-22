// fixed-chart.ts
import * as Sweph from "sweph-wasm";

export interface PlanetaryPosition {
  name: string;
  longitude: number;
  latitude: number;
  distance: number;
  speed: number;
}

export interface HouseCusp {
  house: number;
  cusp: number;
}

const PLANETS = [
  { id: Sweph.SUN, name: "Sun" },
  { id: Sweph.MOON, name: "Moon" },
  { id: Sweph.MERCURY, name: "Mercury" },
  { id: Sweph.VENUS, name: "Venus" },
  { id: Sweph.MARS, name: "Mars" },
  { id: Sweph.JUPITER, name: "Jupiter" },
  { id: Sweph.SATURN, name: "Saturn" },
  { id: Sweph.TRUE_NODE, name: "Rahu" }
  // add Ketu = TRUE_NODE + 180° manually if needed
];

async function getSiderealChart(
  date: Date,
  lat: number,
  lng: number,
  houseSystem: string = "P" // Placidus
): Promise<{ planets: PlanetaryPosition[]; houses: HouseCusp[] }> {
  const swe = await Sweph.init();

  await swe.swe_set_ephe_path(); // use default ephemeris files

  // Convert to UTC Julian day
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;

  const jd = swe.swe_julday(year, month, day, hour, 1); // 1 = Gregorian

  // Set sidereal mode (Lahiri)
  swe.swe_set_sid_mode(Sweph.SE_SIDM_LAHIRI, 0, 0);

  const planets: PlanetaryPosition[] = [];
  for (const p of PLANETS) {
    const flags = Sweph.SEFLG_SWIEPH | Sweph.SEFLG_SPEED;
    const pos = swe.swe_calc_ut(jd, p.id, flags);
    planets.push({
      name: p.name,
      longitude: pos[0],
      latitude: pos[1],
      distance: pos[2],
      speed: pos[3],
    });
  }

  const houses = swe.swe_houses(jd, lat, lng, houseSystem);
  const houseCusps: HouseCusp[] = houses.cusps.map((c, idx) => ({
    house: idx + 1,
    cusp: c
  }));

  swe.swe_close();

  return { planets, houses: houseCusps };
}

// Example usage:
(async () => {
  const date = new Date(Date.UTC(2025, 10, 28, 1, 22, 0)); // e.g. convert your IST to UTC
  const lat = 28.6139;
  const lng = 77.2090;
  const chart = await getSiderealChart(date, lat, lng);

  console.log("Sidereal Planets:");
  chart.planets.forEach(p => {
    console.log(`${p.name}: ${p.longitude.toFixed(2)}°`);
  });
  console.log("House cusps:");
  chart.houses.forEach(h => {
    console.log(`House ${h.house}: ${h.cusp.toFixed(2)}°`);
  });
})();
