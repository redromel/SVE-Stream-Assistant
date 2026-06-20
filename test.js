import { OBSWebSocket } from "obs-websocket-js";
import "dotenv/config";

export const obs = new OBSWebSocket();
const ip_address = process.env.IP_ADDRESS;
const port = process.env.PORT;
const password = process.env.PASSWORD;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
import { updateLifeP1, getScoreP1 } from "./test2.js";
async function connectToOBS() {
  try {
    const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect(
      `ws://${ip_address}:${port}`,
      `${password}`,
    );

    console.log(`Successfully connected to OBS v${obsWebSocketVersion}`);
  } catch (error) {
    console.error("Failed to connect to OBS:", error.message);
  }
}
obs.on("CurrentProgramSceneChanged", (data) => {
  console.log(`Scene switched to: ${data.sceneName}`);
});

await connectToOBS();
let currentLife = await getScoreP1(obs);
let intLife = parseInt(currentLife, 10);
console.log(currentLife)
let newLife = intLife - 1 
await updateLifeP1(obs,--intLife);