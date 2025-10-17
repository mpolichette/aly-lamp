import mqtt from "mqtt";
import { colorMap } from "./color-map.js";
import Lifx from "node-lifx-lan";
import type { LifxLanColorCSS } from "./types.js";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const { MQTT_USERNAME, MQTT_PASSWORD } = process.env;
if (!MQTT_USERNAME || !MQTT_PASSWORD) {
	console.error(
		"MQTT_USERNAME and MQTT_PASSWORD must be set in environment variables.",
	);
	process.exit(1);
}

const client = mqtt.connect("mqtt://homebridge.local:1883", {
	username: MQTT_USERNAME,
	password: MQTT_PASSWORD,
});

client.on("connect", () => {
	console.log("Connected to MQTT broker");
	client.subscribe("m5/rfid");
});

client.on("message", (topic, message) => {
	console.log(`Received message on topic ${topic}: ${message.toString()}`);
	const uid = message.toString().trim();
	const color = colorMap[uid] || generateColorFromUID(uid);
	return setLampColor(color);
});

const generateColorFromUID = (uid: string): LifxLanColorCSS => {
	if (uid.length < 6) return { css: "white" };
	const r = parseInt(uid.slice(0, 2), 16);
	const g = parseInt(uid.slice(2, 4), 16);
	const b = parseInt(uid.slice(4, 6), 16);
	const css = `rgb(${r}, ${g}, ${b})`;
	console.log(`Generated color ${css} from UID: ${uid}`);
	return { css, brightness: 1.0, kelvin: 3500 };
};

const setLampColor = (color: LifxLanColorCSS) => {
	Lifx.turnOnBroadcast({
		color,
	})
		.then(() => {
			console.log("Done!");
		})
		.catch((error) => {
			console.error(error);
		});
};
