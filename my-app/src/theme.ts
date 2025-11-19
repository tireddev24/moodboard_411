import {createSystem, defaultConfig, defineConfig} from "@chakra-ui/react";

const config = defineConfig({
	theme: {
		tokens: {
			colors: {
				primary: {value: "#f7d4e1"},
				secondary: {value: "#EE0F0F"},
			},

			fonts: {
				body: {value: "system-ui, sans-serif"},
			},
		},
	},
});

export const system = createSystem(defaultConfig, config);
