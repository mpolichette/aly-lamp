declare module "node-lifx-lan" {
	import type {
		LifxLanColor,
		LifxLanDeviceInfo,
		LifxLanLightState,
	} from "./types.js";

	interface LifxLanDevice {
		ip: string;
		mac: string;
		deviceInfo: LifxLanDeviceInfo | null;

		// High-level methods
		turnOn: (params?: {
			color?: LifxLanColor;
			duration?: number;
		}) => Promise<void>;

		setColor: (params: {
			color: LifxLanColor;
			duration?: number;
		}) => Promise<void>;

		turnOff: (params?: { duration?: number }) => Promise<void>;

		getDeviceInfo: () => Promise<LifxLanDeviceInfo>;
		getLightState: () => Promise<LifxLanLightState>;
	}

	interface LifxLan {
		discover: (params?: { wait?: number }) => Promise<LifxLanDevice[]>;

		turnOnBroadcast: (params?: {
			color?: LifxLanColor;
			duration?: number;
		}) => Promise<void>;

		setColorBroadcast: (params: {
			color: LifxLanColor;
			duration?: number;
		}) => Promise<void>;

		turnOffBroadcast: (params?: { duration?: number }) => Promise<void>;

		destroy: () => Promise<void>;

		createDevice: (params: {
			ip: string;
			mac: string;
		}) => Promise<LifxLanDevice>;
	}

	const Lifx: LifxLan;
	export = Lifx;
}
