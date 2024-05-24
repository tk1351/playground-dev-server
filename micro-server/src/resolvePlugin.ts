import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Plugin } from "rollup";

const root = process.cwd();

const extensions = ["", ".ts", ".js"];

export const resolve = (): Plugin => {
	return {
		name: "micro-server:resolve",
		async resolveId(id: string) {
			for (const extension of extensions) {
				const absolutePath = path.resolve(root, `.${id}${extension}`);
				try {
					const stat = await fs.stat(absolutePath);
					if (stat.isFile()) {
						return absolutePath;
					}
				} catch {}
			}
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
