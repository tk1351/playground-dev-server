import esbuild from "rollup-plugin-esbuild";
import { resolve } from "./resolvePlugin";

export const getPlugins = () => [
	resolve(),
	esbuild({
		target: "esnext",
		minify: false,
	}),
];
