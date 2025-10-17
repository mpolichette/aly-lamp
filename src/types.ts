// LifxLanColor type definitions based on https://github.com/futomi/node-lifx-lan documentation

export interface LifxLanColorHSB {
	hue: number; // 0.0 to 1.0
	saturation: number; // 0.0 to 1.0
	brightness: number; // 0.0 to 1.0
	kelvin?: number; // 1500 to 9000, default: 3500
}

export interface LifxLanColorRGB {
	red: number; // 0.0 to 1.0
	green: number; // 0.0 to 1.0
	blue: number; // 0.0 to 1.0
	brightness?: number; // 0.0 to 1.0
	kelvin?: number; // 1500 to 9000, default: 3500
}

export interface LifxLanColorXyb {
	x: number; // 0.0 to 1.0
	y: number; // 0.0 to 1.0
	brightness: number; // 0.0 to 1.0
	kelvin?: number; // 1500 to 9000, default: 3500
}

export interface LifxLanColorCSS {
	css: string; // CSS color name, hex (#ff0000), or rgb(255, 0, 0)
	brightness?: number; // 0.0 to 1.0
	kelvin?: number; // 1500 to 9000, default: 3500
}

// Union type for all color formats
export type LifxLanColor =
	| LifxLanColorHSB
	| LifxLanColorRGB
	| LifxLanColorXyb
	| LifxLanColorCSS;

// Device info and state types
export interface LifxLanDeviceInfo {
	label: string;
	vendorId: number;
	vendorName?: string;
	productId: number;
	productName?: string;
	hwVersion: number;
	features: {
		color: boolean;
		infrared: boolean;
		multizone: boolean;
		chain?: boolean;
	};
	location: {
		guid: string;
		label: string;
		updated: Date;
	};
	group: {
		guid: string;
		label: string;
		updated: Date;
	};
	multizone?: {
		count: number;
	} | null;
	chain?: {
		start_index: number;
		total_count: number;
		tile_devices: Array<Record<string, unknown>>;
	} | null;
}

export interface LifxLanLightState {
	color: LifxLanColorHSB;
	power: number; // 0 (off) or 1 (on)
	label: string;
	infrared?: {
		brightness: number;
	} | null;
	multizone?: {
		count: number;
		colors: LifxLanColorHSB[];
	} | null;
	chain?: {
		count: number;
		colors: LifxLanColorHSB[][];
	} | null;
}
