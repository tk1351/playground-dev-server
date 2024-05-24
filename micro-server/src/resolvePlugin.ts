import * as fs from "node:fs/promises";
import * as path from "node:path";
import type { Plugin } from "rollup";

const root = process.cwd();

const extensions = ["", ".ts", ".js"];

const fileExists = async (path: string) => {
	try {
		const stat = await fs.stat(path);
		if (stat.isFile()) {
			return true;
		}
	} catch {}
	return false;
};

export const resolve = (): Plugin => {
	return {
		name: "micro-server:resolve",
		async resolveId(id: string) {
			for (const extension of extensions) {
				const absolutePath = path.resolve(root, `.${id}${extension}`);
				if (await fileExists(absolutePath)) {
					return absolutePath;
				}
			}

			if (id.endsWith("/")) {
				const absolutePath = path.resolve(root, `.${id}index.html`);
				if (await fileExists(absolutePath)) {
					return absolutePath;
				}
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
