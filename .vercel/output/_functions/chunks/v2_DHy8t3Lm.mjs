const v2 = new Proxy({"src":"/_astro/v2.DSi0umbA.webp","width":500,"height":375,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/assets/v2.webp";
							}
							
							return target[name];
						}
					});

export { v2 as default };
