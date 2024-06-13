import { createElement } from "./createElement";
import { render } from "./render";

const Yuzan = {
	createElement,
	render,
};

const element = Yuzan.createElement(
	"div",
	{ id: "foo", },
	Yuzan.createElement("a", { href: "https://github.com" }, "Github.com"),
	Yuzan.createElement("p", null, "test"),
);

const container = document.querySelector("#root");

if (container) Yuzan.render(element, container);
