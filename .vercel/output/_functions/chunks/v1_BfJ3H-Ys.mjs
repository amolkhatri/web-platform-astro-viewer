const v1 = new Proxy({"src":"/_astro/v1.DLA22Wa0.webp","width":500,"height":375,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/assets/v1.webp";
							}
							
							return target[name];
						}
					});

export { v1 as default };
