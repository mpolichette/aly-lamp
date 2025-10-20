import mqtt from "mqtt";
import Lifx from "node-lifx-lan";
import type { LifxLanColorHSB } from "./types.js";
import { config } from "dotenv";
import { knownTags, tagColors } from "./constants.js";
import chalk from "chalk";
import convertColor from "color-convert";

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

let prevUid = "";
client.on("message", (topic, message) => {
	const uid = message.toString().trim();
	if (uid === prevUid) return;
	prevUid = uid;

	// Resolve tag and color w/ fallback to generated color
	const tag = knownTags[uid];
	const tagColor = tag ? tagColors[tag] : undefined;
	const color = tagColor || generateColor(uid);
	const colorHex = getColorHex(color);
	const tagName = tag
		? `[${uid}] ${chalk.hex(colorHex)(tag)}`
		: `[${uid}] unknown tag`;
	console.log(`[${topic}] Recieved ${tagName}`);
	const colorName = tag ? tag : "generated color";
	console.log(`[lifx] Broadcast setColor: ${chalk.hex(colorHex)(colorName)}`);
	return setLampColor(color);
});

const generateColor = (uid: string): LifxLanColorHSB => {
	// Use a simple hash to generate consistent hue from UID
	let hash = 0;
	for (let i = 0; i < uid.length; i++) {
		hash = ((hash << 5) - hash + uid.charCodeAt(i)) & 0xffffffff;
	}
	// Convert hash to hue (0-360)
	const hue = (Math.abs(hash) % 360) / 360;
	return { hue, saturation: 1.0, brightness: 0.5 };
};

const getColorHex = (color: LifxLanColorHSB): string => {
	const h = Math.round(color.hue * 360);
	const s = Math.round((color.saturation || 1) * 100);
	const b = Math.round((color.brightness || 1) * 100);
	const hex = convertColor.hsl.hex(h, s, b);
	return hex;
};

const setLampColor = (color: LifxLanColorHSB) => {
	Lifx.turnOnBroadcast({
		color,
	}).catch((error) => {
		console.error(error);
	});
};
