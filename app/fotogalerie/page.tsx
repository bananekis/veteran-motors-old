import { cars } from "@/lib/data";
import PhotoGallery from "@/components/photo-gallery";

export default function GalleryPage() {
	// BMW 2002 Touring photos
	const bmwPhotos = [
		{
			src: "/bmw-2002-touring-side.jpeg",
			alt: "BMW 2002 Touring - Side view",
		},
		{
			src: "/bmw-2002-touring-front.jpeg",
			alt: "BMW 2002 Touring - Front view",
		},
		{
			src: "/bmw-2002-touring-badge.jpeg",
			alt: "BMW 2002 Touring - Rear badge detail",
		},
		{
			src: "/bmw-2002-touring-wheel.jpeg",
			alt: "BMW 2002 Touring - Wheel detail",
		},
		{
			src: "/bmw-2002-touring-angle.jpeg",
			alt: "BMW 2002 Touring - Front 3/4 view",
		},
		{
			src: "/bmw-2002-touring-speedo.jpeg",
			alt: "BMW 2002 Touring - Speedometer",
		},
		{
			src: "/bmw-2002-touring-interior.jpeg",
			alt: "BMW 2002 Touring - Interior view",
		},
		{
			src: "/bmw-2002-touring-interior2.jpeg",
			alt: "BMW 2002 Touring - Interior from passenger side",
		},
		{
			src: "/bmw-2002-touring-steering.jpeg",
			alt: "BMW 2002 Touring - Steering wheel detail",
		},
	];

	// Collect all images from all cars
	const carPhotos = cars.flatMap((car) => [
		{
			src: car.mainImage,
			alt: car.name,
		},
		...car.images.map((image) => ({
			src: image,
			alt: `${car.name} - detail`,
		})),
	]);

	return (
		<div className="pt-32 pb-16">
			<div className="container-vintage">
				<h1 className="text-4xl md:text-5xl font-bold text-center mb-12 vintage-heading mx-auto">
					FOTOGALERIE
				</h1>

				<div className="mb-16">
					<h2 className="text-2xl font-semibold mb-8 vintage-heading">
						BMW 2002 Touring
					</h2>
					<PhotoGallery photos={bmwPhotos} />
				</div>

				<div>
					<h2 className="text-2xl font-semibold mb-8 vintage-heading">
						Naše další vozy
					</h2>
					<PhotoGallery photos={carPhotos} />
				</div>
			</div>
		</div>
	);
}
