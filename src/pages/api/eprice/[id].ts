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

const vehicles = vehiclesJson as Vehicle[];

const formatCurrency = (value: number) =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(value);

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

const buildOverlayMarkup = (vehicle: Vehicle) => {
	const vehicleName = escapeHtml(
		`${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`,
	);

	return `
<div class="eprice-overlay" role="dialog" aria-modal="true" aria-labelledby="eprice-title-${
		vehicle.id
	}">
	<button
		class="eprice-overlay__backdrop"
		type="button"
		data-overlay-dismiss="eprice"
		aria-label="Close Get E-Price overlay"
	></button>
	<div
		class="eprice-overlay__panel"
		tabindex="-1"
		data-overlay-panel
	>
		<button
			class="eprice-overlay__close"
			type="button"
			data-overlay-dismiss="eprice"
			aria-label="Close Get E-Price overlay"
		>&times;</button>

		<p class="eprice-overlay__eyebrow">Passport Exclusive</p>
		<h2 class="eprice-overlay__title" id="eprice-title-${vehicle.id}">
			Get the Passport E-Price in seconds
		</h2>
		<p class="eprice-overlay__subtitle">
			Share your contact info and we'll reserve today's best offer for the ${vehicleName}.
		</p>

		<div class="eprice-overlay__summary">
			<div>
				<p class="eprice-overlay__summary-label">Vehicle</p>
				<p class="eprice-overlay__summary-value">${vehicleName}</p>
				<p class="eprice-overlay__meta">
					Stock #${escapeHtml(vehicle.stock)} · VIN ${escapeHtml(vehicle.vin)}
				</p>
			</div>
			<div class="eprice-overlay__price-card">
				<div class="eprice-overlay__price-row">
					<span class="eprice-overlay__summary-label">MSRP</span>
					<span class="eprice-overlay__price eprice-overlay__price--muted">${formatCurrency(
						vehicle.msrp,
					)}</span>
				</div>
				<div class="eprice-overlay__price-row">
					<span class="eprice-overlay__summary-label">Passport Price</span>
					<span class="eprice-overlay__price">${formatCurrency(
						vehicle.price,
					)}</span>
				</div>
				<p class="eprice-overlay__meta">${escapeHtml(vehicle.status)}</p>
			</div>
		</div>

		<ul class="eprice-overlay__chips" aria-label="Quick specs">
			<li class="eprice-overlay__chip">${escapeHtml(vehicle.exteriorColor)}</li>
			<li class="eprice-overlay__chip">${escapeHtml(vehicle.interiorColor)} interior</li>
			<li class="eprice-overlay__chip">${escapeHtml(vehicle.engine)}</li>
			<li class="eprice-overlay__chip">${escapeHtml(vehicle.drivetrain)}</li>
		</ul>

		<form
			class="eprice-overlay__form"
			hx-post="/api/eprice/request"
			hx-target="#eprice-overlay-root"
			hx-swap="innerHTML"
			hx-disabled-elt=".eprice-overlay__submit"
		>
			<input type="hidden" name="vehicleId" value="${vehicle.id}" />

			<label class="eprice-overlay__field">
				<span>Full name</span>
				<input
					type="text"
					name="name"
					placeholder="Jamie Smith"
					required
					autocomplete="name"
				/>
			</label>

			<label class="eprice-overlay__field">
				<span>Email</span>
				<input
					type="email"
					name="email"
					placeholder="you@email.com"
					required
					autocomplete="email"
				/>
			</label>

			<label class="eprice-overlay__field">
				<span>Phone</span>
				<input
					type="tel"
					name="phone"
					placeholder="(555) 123-4567"
					autocomplete="tel"
				/>
			</label>

			<label class="eprice-overlay__field">
				<span>Preferred contact</span>
				<select name="contactPreference">
					<option value="email">Email</option>
					<option value="call">Phone Call</option>
					<option value="text">Text Message</option>
				</select>
			</label>

			<button class="btn btn-primary eprice-overlay__submit" type="submit">
				<span class="eprice-overlay__submit-label">Send me the E-Price</span>
				<span class="eprice-overlay__submit-spinner" aria-hidden="true"></span>
			</button>

			<p class="eprice-overlay__disclaimer">
				We respect your privacy. Submitting this form authorizes Passport Mazda to contact you about this offer.
			</p>
		</form>
	</div>
</div>
`;
};

export const GET: APIRoute = async ({ params }) => {
	const id = params.id;

	if (!id) {
		return new Response("Missing vehicle id", {
			status: 400,
			headers: { "Content-Type": "text/plain; charset=utf-8" },
		});
	}

	const vehicle = vehicles.find((item) => item.id === id);

	if (!vehicle) {
		return new Response("Vehicle not found", {
			status: 404,
			headers: { "Content-Type": "text/plain; charset=utf-8" },
		});
	}

	return new Response(buildOverlayMarkup(vehicle), {
		status: 200,
		headers: {
			"Content-Type": "text/html; charset=utf-8",
			"Cache-Control": "no-store",
		},
	});
};
