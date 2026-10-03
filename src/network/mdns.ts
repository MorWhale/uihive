import Bonjour from "bonjour-service";
export function advertise(name: string, port = 4090) {
  const bonjour = new Bonjour();
  return bonjour.publish({ name, type: "uihive", port });
}
