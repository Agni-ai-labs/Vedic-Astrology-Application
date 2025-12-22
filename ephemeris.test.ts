import { getSiderealChart } from "./fixed-chart";

async function test() {
  const date = new Date(Date.UTC(2025, 10, 28, /* choose appropriate UTC time */ 1, 22, 0));  // e.g. convert 6:52 IST to UTC
  const lat = 28.6139;
  const lng = 77.2090;

  const chart = await getSiderealChart(date, lat, lng);
  console.log("===== Sidereal Chart =====");
  chart.planets.forEach(p => {
    console.log(`${p.name.padEnd(8)} : ${p.longitude.toFixed(2)}°`);
  });
  console.log("Cusps:");
  chart.houses.forEach(h => {
    console.log(`House ${h.house}: ${h.cusp.toFixed(2)}°`);
  });
}

test().catch(console.error);
