import { advertise } from "../network/mdns.js";
import { t } from "../i18n.js";

export async function serve() {
  advertise("uihive", 4090);
  console.log(t("serveStart", 4090));
  setInterval(() => {}, 1 << 30);
}
