const v4 = new Proxy({"src":"/_astro/v4.qF6Rjjg2.webp","width":500,"height":375,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/assets/v4.webp";
							}
							
							return target[name];
						}
					});

export { v4 as default };
