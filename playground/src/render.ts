export const render = (
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	element: { type: string; props: Record<string, any> },
	container: Text | Element,
) => {
	const dom =
		element.type === "TEXT_ELEMENT"
			? document.createTextNode("")
			: document.createElement(element.type);

	const isProperty = (key: string) => key !== "children";
	const filteredProps = Object.keys(element.props).filter(isProperty);

	for (const property of filteredProps) {
		// @ts-ignore
		dom[property] = element.props[property];
	}

	for (const child of element.props.children) {
		render(child, dom);
	}

	container.appendChild(dom);
};
