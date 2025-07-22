export interface Car {
	id: string;
	name: string;
	year: number;
	brand: string;
	model: string;
	mainImage: string;
	images: string[];
	price: number;
	description: string;
	specifications: {
		engine: string;
		transmission: string;
		condition: string;
		mileage?: number;
		color?: string;
	};
	available: boolean;
	featured?: boolean;
	category: "sale" | "rental" | "wedding" | "all";
	stockType?: "skladem" | "dovoz";
	bodyType?: string;
}

export interface RentalPrice {
	duration: string;
	price: number;
	deposit: number;
}

export interface WeddingService {
	id: string;
	name: string;
	description: string;
	price: number;
}
