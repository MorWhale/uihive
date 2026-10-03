import Bonjour from "bonjour-service";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export async function discover() {
  const bonjour = new Bonjour();
  console.log("Scanning for _uihive._tcp...");
  bonjour.find({ type: "uihive" }, (service) => {
    console.log(`${service.name} — ${service.host}:${service.port}`);
  });
  setTimeout(() => { bonjour.destroy(); process.exit(0); }, 5000);
}
