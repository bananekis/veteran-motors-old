import emailjs from "@emailjs/browser";

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailData {
	to_email?: string;
	from_name: string;
	from_email: string;
	from_phone?: string;
	subject: string;
	message: string;
	car_type?: string;
	date_from?: string;
	date_to?: string;
	purpose?: string;
	location?: string;
	hours?: string;
	inquiry_type?: string;
	// Sale form fields
	brand?: string;
	type?: string;
	bodyType?: string;
	engine?: string;
	transmission?: string;
	color?: string;
	price?: string;
	condition?: string;
	// Vehicle interest form fields
	vehicle_name?: string;
	viewing_date?: string;
	offered_price?: string;
	// Index signature for EmailJS compatibility
	[key: string]: unknown;
}

export const sendEmail = async (
	templateParams: EmailData
): Promise<boolean> => {
	try {
		console.log("Sending email with params:", templateParams);

		const result = await emailjs.send(
			EMAILJS_SERVICE_ID,
			EMAILJS_TEMPLATE_ID,
			templateParams
		);

		console.log("Email sent successfully:", result);
		return true;
	} catch (error) {
		console.error("Failed to send email:", error);
		return false;
	}
};

// Helper function to format rental form data for email
export const formatRentalFormData = (data: any): EmailData => {
	return {
		from_name: `${data.email}`, // Using email as name since name field is not in rental form
		from_email: data.email,
		from_phone: data.phone,
		subject: `Rezervace vozu - ${data.carType}`,
		message: `
Rezervace vozu:

Typ vozidla: ${data.carType}
Účel pronájmu: ${data.purpose}
Datum od: ${data.dateFrom}
Datum do: ${data.dateTo}
${data.hours ? `Počet hodin: ${data.hours}` : ""}
Místo konání: ${data.location}
Telefon: ${data.phone}
Email: ${data.email}
${data.comment ? `\nDoplňující text: ${data.comment}` : ""}
    `.trim(),
		car_type: data.carType,
		purpose: data.purpose,
		date_from: data.dateFrom,
		date_to: data.dateTo,
		hours: data.hours,
		location: data.location,
	};
};

// Helper function to format wedding form data for email
export const formatWeddingFormData = (data: any): EmailData => {
	return {
		from_name: `${data.email}`, // Using email as name since name field is not in wedding form
		from_email: data.email,
		from_phone: data.phone,
		subject: `Rezervace vozu na svatbu - ${data.carType}`,
		message: `
Rezervace vozu na svatbu:

Typ vozidla: ${data.carType}
Datum od: ${data.dateFrom}
Datum do: ${data.dateTo}
Místo konání: ${data.location}
Telefon: ${data.phone}
Email: ${data.email}
${data.comment ? `\nKomentář + specifikace požadavků: ${data.comment}` : ""}
    `.trim(),
		car_type: data.carType,
		date_from: data.dateFrom,
		date_to: data.dateTo,
		location: data.location,
	};
};

// Helper function to format contact form data for email
export const formatContactFormData = (data: any): EmailData => {
	return {
		from_name: data.name,
		from_email: data.email,
		from_phone: data.phone,
		subject: data.subject,
		message: `
Kontaktní formulář:

Jméno: ${data.name}
Email: ${data.email}
${data.phone ? `Telefon: ${data.phone}` : ""}
Typ dotazu: ${data.inquiryType}
Předmět: ${data.subject}

Zpráva:
${data.message}
    `.trim(),
		inquiry_type: data.inquiryType,
	};
};

// Helper function to format sale form data for email
export const formatSaleFormData = (data: any): EmailData => {
	return {
		from_name: data.email || data.phone, // Use email if provided, otherwise phone
		from_email: data.email || "noreply@veteranmotors.cz", // Fallback email if none provided
		from_phone: data.phone,
		subject: `Poptávka vozu${data.brand ? ` - ${data.brand}` : ""}${
			data.type ? ` ${data.type}` : ""
		}`,
		message: `
Poptávka vozu:

Telefon: ${data.phone}
${data.email ? `Email: ${data.email}` : ""}
${data.brand ? `Značka: ${data.brand}` : ""}
${data.type ? `Typ: ${data.type}` : ""}
${data.bodyType ? `Karoserie: ${data.bodyType}` : ""}
${data.engine ? `Motor: ${data.engine}` : ""}
${data.transmission ? `Převodovka: ${data.transmission}` : ""}
${data.color ? `Barva: ${data.color}` : ""}
${data.price ? `Cenová představa: ${data.price}` : ""}
${data.condition ? `Stav: ${data.condition}` : ""}
${data.description ? `\nDoplňující popis: ${data.description}` : ""}

* Povinné je pouze telefonní číslo, ostatní kategorie jsou nepovinné
    `.trim(),
		// Additional fields for template variables
		brand: data.brand,
		type: data.type,
		bodyType: data.bodyType,
		engine: data.engine,
		transmission: data.transmission,
		color: data.color,
		price: data.price,
		condition: data.condition,
	};
};

// Helper function to format vehicle interest form data for email
export const formatVehicleInterestFormData = (
	data: any,
	vehicleName: string
): EmailData => {
	return {
		from_name: data.name,
		from_email: data.email,
		from_phone: data.phone,
		subject: `Zájem o vozidlo - ${vehicleName}`,
		message: `
Zájem o vozidlo:

Vozidlo: ${vehicleName}
Jméno: ${data.name}
Telefon: ${data.phone}
Email: ${data.email}
${data.viewingDate ? `Termín prohlídky: ${data.viewingDate}` : ""}
${data.offeredPrice ? `Nabízená cena: ${data.offeredPrice}` : ""}

Zpráva:
${data.message}
    `.trim(),
		vehicle_name: vehicleName,
		viewing_date: data.viewingDate,
		offered_price: data.offeredPrice,
	};
};
