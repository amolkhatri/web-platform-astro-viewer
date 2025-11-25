import type { APIRoute } from "astro";
import vehiclesJson from "../../../data/vehicles.json";

interface Vehicle {
	id: string;
	year: number;
	make: string;
	model: string;
	trim: string;
	vin: string;
	stock: string;
	status: string;
	price: number;
	msrp: number;
	image: string;
	exteriorColor: string;
	interiorColor: string;
	engine: string;
	transmission: string;
	drivetrain: string;
	mpg: string;
}

type ContactPreference = "email" | "call" | "text";

const vehicles = vehiclesJson as Vehicle[];
const CONTACT_OPTIONS: ContactPreference[] = ["email", "call", "text"];

const escapeHtml = (value: string) =>
	value.replace(/[&<>"']/g, (char) => {
		switch (char) {
			case "&":
				return "&amp;";
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case '"':
				return "&quot;";
			case "'":
				return "&#39;";
			default:
				return char;
		}
	});

const sanitizeText = (value: string, fallback = "", maxLength = 160) => {
	const normalized = value.trim() || fallback;
	const limited =
		normalized.length > maxLength
			? normalized.slice(0, maxLength)
			: normalized;
	return escapeHtml(limited);
};

const formatCurrency = (value: number) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);

const toStringValue = (value: FormDataEntryValue | null) =>
	typeof value === "string" ? value : value ? String(value) : "";

const buildSuccessMarkup = (
	vehicle: Vehicle,
	name: string,
	email: string,
	phone: string,
	preference: ContactPreference,
) => {
	const vehicleName = escapeHtml(
		`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`,
	);

	const contactLine =
		preference === "call"
			? `We'll give you a quick call${phone ? ` at ${phone}` : ""} to confirm next steps.`
			: preference === "text"
			? `Expect a text update${phone ? ` at ${phone}` : ""} as soon as your offer is ready.`
			: `We'll email the full breakdown${email ? ` to ${email}` : ""} in just a moment.`;

	return `
<div class="eprice-overlay" role="dialog" aria-modal="true" aria-labelledby="eprice-success-title">
	<button
		class="eprice-overlay__backdrop"
		type="button"
		data-overlay-dismiss="eprice"
		aria-label="Close Get E-Price overlay"
	></button>
	<div class="eprice-overlay__panel eprice-overlay__panel--success" tabindex="-1" data-overlay-panel>
		<button
			class="eprice-overlay__close"
			type="button"
			data-overlay-dismiss="eprice"
			aria-label="Close Get E-Price overlay"
		>&times;</button>

		<div class="eprice-overlay__success-icon" aria-hidden="true">✅</div>
		<h2 class="eprice-overlay__title" id="eprice-success-title">
			You're all set, ${name}!
		</h2>
		<p class="eprice-overlay__subtitle">
			We've locked the Passport E-Price for the ${vehicleName}. ${contactLine}
		</p>

		<div class="eprice-overlay__success-card">
			<div class="eprice-overlay__price-row">
				<span class="eprice-overlay__summary-label">Passport Price</span>
				<span class="eprice-overlay__price">${formatCurrency(vehicle.price)}</span>
			</div>
			<p class="eprice-overlay__meta">${vehicleName}</p>
			<p class="eprice-overlay__meta">
				Stock #${escapeHtml(vehicle.stock)} · VIN ${escapeHtml(vehicle.vin)}
			</p>
		</div>

		<button class="btn btn-primary" type="button" data-overlay-dismiss="eprice">
			Back to shopping
		</button>
	</div>
</div>
`;
};

export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData();

	const rawVehicleId = toStringValue(formData.get("vehicleId")).trim();
	const vehicleId =
		rawVehicleId.length > 32 ? rawVehicleId.slice(0, 32) : rawVehicleId;
	const rawName = toStringValue(formData.get("name"));
	const rawEmail = toStringValue(formData.get("email"));
	const rawPhone = toStringValue(formData.get("phone"));
	const preferenceInput = toStringValue(
		formData.get("contactPreference"),
	).trim().toLowerCase();

	const safeName = sanitizeText(rawName, "Friend", 60);
	const safeEmail = sanitizeText(rawEmail, "", 120);
	const safePhone = sanitizeText(rawPhone, "", 40);

	const preference = CONTACT_OPTIONS.includes(
		preferenceInput as ContactPreference,
	)
		? (preferenceInput as ContactPreference)
		: "email";

	const vehicle = vehicles.find((item) => item.id === vehicleId);

	if (!vehicle) {
		return new Response(
			`<div class="eprice-overlay"><div class="eprice-overlay__panel" data-overlay-panel><p class="eprice-overlay__subtitle">We couldn't find that vehicle anymore. Please refresh and try again.</p><button class="btn btn-primary" type="button" data-overlay-dismiss="eprice">Close</button></div></div>`,
			{
				status: 404,
				headers: { "Content-Type": "text/html; charset=utf-8" },
			},
		);
	}

	return new Response(
		buildSuccessMarkup(vehicle, safeName, safeEmail, safePhone, preference),
		{
			status: 200,
			headers: {
				"Content-Type": "text/html; charset=utf-8",
				"Cache-Control": "no-store",
			},
		},
	);
};
