const v3 = new Proxy({"src":"/_astro/v3.jSFCo5LF.webp","width":500,"height":375,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/amolkhatri/projects/astro-websites-platform/viewer/src/assets/v3.webp";
							}
							
							return target[name];
						}
					});

export { v3 as default };
