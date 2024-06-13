const createTextElement = (text: string) => {
	return {
		type: "TEXT_ELEMENT",
		props: {
			nodeValue: text,
			children: [],
		},
	};
};

export const createElement = (
	type: string,
	props?: Record<string, string> | null,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	...children: any[]
) => {
	return {
		type,
		props: {
			...props,
			children: children.map((child) =>
				typeof child === "object" ? child : createTextElement(child),
			),
		},
	};
};
