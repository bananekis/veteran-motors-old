import type React from "react";
import type { Metadata } from "next";
import { Cormorant, Marcellus, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

export const dynamic = "force-dynamic"; // Ensures the layout is always re-rendered

const cormorant = Cormorant({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-cormorant",
});

const marcellus = Marcellus({
	subsets: ["latin"],
	weight: "400",
	display: "swap",
	variable: "--font-marcellus",
});

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-montserrat",
});

export const metadata: Metadata = {
	title: "Veteran Motors | Vintage Car Sales & Rentals",
	description:
		"Veteran Motors - Classic and vintage cars for sale, rent, and special occasions",
	generator: "v0.dev",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${cormorant.variable} ${marcellus.variable} ${montserrat.variable}`}
		>
			<body className="min-h-screen flex flex-col bg-cream">
				<ThemeProvider attribute="class" defaultTheme="light">
					<Navbar />
					<main className="flex-1">{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
