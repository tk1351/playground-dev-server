import connect from "connect";
import historyApiFallback from "connect-history-api-fallback";
import sirv from "sirv";
import { createPluginContainer } from "./pluginContainer";
import { getPlugins } from "./plugins";
import { transformMiddleware } from "./transformMiddleware";

export const startDev = () => {
	const server = connect();
	server.listen(3000, "localhost");

	const plugins = getPlugins();
	const pluginContainer = createPluginContainer(plugins);

	server.use(transformMiddleware(pluginContainer));
	server.use(
		sirv(undefined, {
			dev: true,
			etag: true,
			setHeaders(res, pathname) {
				console.log("res", res, pathname);
				if (/\.[tj]s$/.test(pathname)) {
					res.setHeader("Content-Type", "application/javascript");
				}
			},
		}),
	);
	// biome-ignore lint/suspicious/noExplicitAny: とりあえず型エラー回避
	server.use(historyApiFallback() as any);

	console.log("dev server running at http://localhost:3000 🚀");
};
