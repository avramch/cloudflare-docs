import config from "../../../astro.config.ts";
import { visit } from "unist-util-visit";
import type { Root } from "hast";

// Rewrite relative /api/ links to be absolute, using the `site` base from the Astro config.
export default function () {
	return function (tree: Root) {
		visit(tree, "element", function (element) {
			if (element.tagName === "a") {
				if (element.properties.href) {
					const url = new URL(element.properties.href as string, config.site);

					if (url.origin === config.site) {
						if (url.pathname.startsWith("/api/")) {
							element.properties.href = url.toString();
						}
					}
				}
			}
		});
	};
}
