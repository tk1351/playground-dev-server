import esbuild from "rollup-plugin-esbuild";
import { reload } from "./reloadPlugin";
import { resolve } from "./resolvePlugin";

export const getPlugins = () => [
	resolve(),
	reload(),
	esbuild({
		target: "esnext",
		minify: false,
	}),
];
