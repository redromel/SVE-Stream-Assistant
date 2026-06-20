import { OBSWebSocket } from 'obs-websocket-js';
import 'dotenv/config';

const obs = new OBSWebSocket();
const ip_address = process.env.IP_ADDRESS;
const port = process.env.PORT;
const password = process.env.PASSWORD;

async function connectToOBS() {
  try {
    // Replace with your actual password from OBS Server Settings
    const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect(
      `ws://${ip_address}:${port}`, 
      `${password}`
    );
    
    console.log(`Successfully connected to OBS v${obsWebSocketVersion}`);

  } catch (error) {
    console.error('Failed to connect to OBS:', error.message);
  }
}

connectToOBS();
