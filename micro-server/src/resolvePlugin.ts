import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Plugin } from "rollup";

const root = process.cwd();

export const resolve = (): Plugin => {
	return {
		name: "micro-server:resolve",
		async resolveId(id: string) {
			const absolutePath = path.resolve(root, `.${id}`);
			try {
				const stat = await fs.stat(absolutePath);
				if (stat.isFile()) {
					return absolutePath;
				}
			} catch {}
			return null;
		},
		async load(id: string) {
			try {
				return await fs.readFile(id, "utf-8");
			} catch {}
			return null;
		},
	};
};
