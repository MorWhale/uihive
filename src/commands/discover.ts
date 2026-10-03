import Bonjour from "bonjour-service";
import { t } from "../i18n.js";

export async function discover() {
  const bonjour = new Bonjour();
  console.log(t("scanning"));
  bonjour.find({ type: "uihive" }, (service) => {
    console.log(`${service.name} — ${service.host}:${service.port}`);
  });
  setTimeout(() => { bonjour.destroy(); process.exit(0); }, 5000);
}
