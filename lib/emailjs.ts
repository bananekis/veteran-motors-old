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
	inquiry_type?: string;
	// Sale form fields
	brand?: string;
	type?: string;
	price?: string;
	transmission?: string;
	engine?: string;
	condition?: string;
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
Datum od: ${data.dateFrom}
Datum do: ${data.dateTo}
Účel pronájmu: ${data.purpose}
Místo konání: ${data.location}
Telefon: ${data.phone}
Email: ${data.email}
${data.comment ? `\nPoznámka: ${data.comment}` : ""}
    `.trim(),
		car_type: data.carType,
		date_from: data.dateFrom,
		date_to: data.dateTo,
		purpose: data.purpose,
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
		from_name: data.email, // Using email as name since there's no name field
		from_email: data.email,
		from_phone: data.phone,
		subject: `Poptávka vozu - ${data.brand} ${data.type}`,
		message: `
Poptávka vozu:

Email: ${data.email}
Telefon: ${data.phone}
Značka: ${data.brand}
Typ: ${data.type}
Cenová představa: ${data.price}
${data.transmission ? `Převodovka: ${data.transmission}` : ""}
${data.engine ? `Motor: ${data.engine}` : ""}
${data.condition ? `Stav: ${data.condition}` : ""}
${data.description ? `\nDoplňující popis: ${data.description}` : ""}
    `.trim(),
		// Additional fields for template variables
		brand: data.brand,
		type: data.type,
		price: data.price,
		transmission: data.transmission,
		engine: data.engine,
		condition: data.condition,
	};
};
