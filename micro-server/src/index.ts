import cac from "cac";
import { startBuild } from "./build";
import { startDev } from "./dev";

const cli = cac();

cli.command("dev").action(() => {
	startDev();
});
cli.command("build").action(async () => {
	await startBuild();
});

cli.help();
cli.parse();
