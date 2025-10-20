import type { LifxLanColorHSB } from "./types.js";

export const knownTags: Record<string, string> = {
	"53E0E097020001000000": "orange circuit",
	"53AEF18F020001000000": "battery charged blue",
	"53FAFE8F020001000000": "graphic green",
	"535C1290020001000000": "electric lime",
	"537DDB8F020001000000": "ultra violet",
	"537DE38F020001000000": "hot pink",
	"5395EA8F020001000000": "blue bolt",
	"53FB788F020001000000": "hot magenta",
	"538E0D90020001000000": "laser lemon",
	"531D0690020001000000": "infra red",
	"5357D597020001000000": "blue",
};

const hue = (h: number) => h / 360;

export const tagColors: Record<string, LifxLanColorHSB> = {
	"orange circuit": { hue: hue(30), saturation: 1, brightness: 0.5 }, // #ff7e00
	"battery charged blue": { hue: hue(194), saturation: 0.76, brightness: 0.48 }, // #1dacd6
	"graphic green": { hue: hue(159), saturation: 0.43, brightness: 0.42 }, // #3d9979
	"electric lime": { hue: hue(84), saturation: 1, brightness: 0.42 }, // #81d800
	"ultra violet": { hue: hue(282), saturation: 0.31, brightness: 0.55 }, // #9a68af
	"hot pink": { hue: hue(323), saturation: 1, brightness: 0.74 }, // #ff78cb
	"blue bolt": { hue: hue(196), saturation: 1, brightness: 0.49 }, // #00b9fb
	"hot magenta": { hue: hue(313), saturation: 1, brightness: 0.56 }, // #ff1dce
	"laser lemon": { hue: hue(60), saturation: 1, brightness: 0.7 }, // #ffff66
	"infra red": { hue: hue(348), saturation: 1, brightness: 0.64 }, // #ff496c
	blue: { hue: hue(216), saturation: 1, brightness: 0.5 }, // #0066ff
};
