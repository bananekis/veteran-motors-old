import type { Car, RentalPrice, WeddingService } from "./types"

export const cars: Car[] = [
  {
    id: "ford-model-a-1930",
    name: "Ford Model A (1930)",
    year: 1930,
    brand: "Ford",
    model: "Model A",
    mainImage: "/placeholder.svg?height=600&width=800&query=1930 Ford Model A vintage car, brown color, art deco style",
    images: [
      "/placeholder.svg?height=600&width=800&query=1930 Ford Model A front view, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1930 Ford Model A interior, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1930 Ford Model A engine, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1930 Ford Model A side view, vintage car, art deco style",
    ],
    price: 850000,
    description:
      "Krásný Ford Model A z roku 1930 v původním stavu. Vůz je plně pojízdný a připravený k okamžitému užívání. Ideální pro sběratele nebo nadšence do historických vozidel.",
    specifications: {
      engine: "3.3L 4-válec",
      transmission: "Manuální, 3 stupně",
      condition: "Velmi dobrý stav",
      mileage: 45000,
      color: "Hnědá",
    },
    available: true,
    featured: true,
    category: "sale",
  },
  {
    id: "rolls-royce-phantom-1925",
    name: "Rolls-Royce Phantom (1925)",
    year: 1925,
    brand: "Rolls-Royce",
    model: "Phantom",
    mainImage:
      "/placeholder.svg?height=600&width=800&query=1925 Rolls Royce Phantom vintage car, black color, art deco style",
    images: [
      "/placeholder.svg?height=600&width=800&query=1925 Rolls Royce Phantom front view, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1925 Rolls Royce Phantom interior, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1925 Rolls Royce Phantom engine, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1925 Rolls Royce Phantom side view, vintage car, art deco style",
    ],
    price: 3500000,
    description:
      "Legendární Rolls-Royce Phantom z roku 1925. Tento vůz představuje vrchol luxusu své doby. Kompletně zrenovovaný s původními díly, v perfektním stavu.",
    specifications: {
      engine: "7.7L 6-válec",
      transmission: "Manuální, 4 stupně",
      condition: "Výborný stav",
      mileage: 32000,
      color: "Černá",
    },
    available: true,
    featured: true,
    category: "rental",
  },
  {
    id: "bentley-speed-six-1929",
    name: "Bentley Speed Six (1929)",
    year: 1929,
    brand: "Bentley",
    model: "Speed Six",
    mainImage:
      "/placeholder.svg?height=600&width=800&query=1929 Bentley Speed Six vintage car, racing green color, art deco style",
    images: [
      "/placeholder.svg?height=600&width=800&query=1929 Bentley Speed Six front view, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1929 Bentley Speed Six interior, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1929 Bentley Speed Six engine, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1929 Bentley Speed Six side view, vintage car, art deco style",
    ],
    price: 4200000,
    description:
      "Ikonický Bentley Speed Six z roku 1929, známý z závodů Le Mans. Tento vůz kombinuje sportovní výkon s luxusem typickým pro značku Bentley.",
    specifications: {
      engine: "6.5L 6-válec",
      transmission: "Manuální, 4 stupně",
      condition: "Dobrý stav",
      mileage: 28000,
      color: "Racing Green",
    },
    available: true,
    category: "sale",
  },
  {
    id: "cadillac-v16-1930",
    name: "Cadillac V16 (1930)",
    year: 1930,
    brand: "Cadillac",
    model: "V16",
    mainImage:
      "/placeholder.svg?height=600&width=800&query=1930 Cadillac V16 vintage car, burgundy color, art deco style",
    images: [
      "/placeholder.svg?height=600&width=800&query=1930 Cadillac V16 front view, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1930 Cadillac V16 interior, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1930 Cadillac V16 engine, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1930 Cadillac V16 side view, vintage car, art deco style",
    ],
    price: 5100000,
    description:
      "Luxusní Cadillac V16 z roku 1930, jeden z nejprestižnějších automobilů své doby. Vůz je vybaven impozantním 16válcovým motorem a nabízí nevídaný komfort.",
    specifications: {
      engine: "7.4L V16",
      transmission: "Manuální, 3 stupně",
      condition: "Výborný stav",
      mileage: 18000,
      color: "Burgundy",
    },
    available: true,
    category: "wedding",
  },
  {
    id: "packard-eight-1931",
    name: "Packard Eight (1931)",
    year: 1931,
    brand: "Packard",
    model: "Eight",
    mainImage:
      "/placeholder.svg?height=600&width=800&query=1931 Packard Eight vintage car, cream color, art deco style",
    images: [
      "/placeholder.svg?height=600&width=800&query=1931 Packard Eight front view, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1931 Packard Eight interior, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1931 Packard Eight engine, vintage car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1931 Packard Eight side view, vintage car, art deco style",
    ],
    price: 1800000,
    description:
      "Elegantní Packard Eight z roku 1931. Tento vůz představuje americký luxus 30. let a je ideální pro svatby a speciální příležitosti.",
    specifications: {
      engine: "5.2L 8-válec",
      transmission: "Manuální, 3 stupně",
      condition: "Velmi dobrý stav",
      mileage: 42000,
      color: "Krémová",
    },
    available: true,
    featured: true,
    category: "wedding",
  },
  {
    id: "bugatti-type-35-1927",
    name: "Bugatti Type 35 (1927)",
    year: 1927,
    brand: "Bugatti",
    model: "Type 35",
    mainImage:
      "/placeholder.svg?height=600&width=800&query=1927 Bugatti Type 35 vintage race car, blue color, art deco style",
    images: [
      "/placeholder.svg?height=600&width=800&query=1927 Bugatti Type 35 front view, vintage race car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1927 Bugatti Type 35 interior, vintage race car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1927 Bugatti Type 35 engine, vintage race car, art deco style",
      "/placeholder.svg?height=600&width=800&query=1927 Bugatti Type 35 side view, vintage race car, art deco style",
    ],
    price: 7500000,
    description:
      "Legendární závodní Bugatti Type 35 z roku 1927. Jeden z nejúspěšnějších závodních vozů všech dob s bohatou historií vítězství.",
    specifications: {
      engine: "2.0L 8-válec",
      transmission: "Manuální, 4 stupně",
      condition: "Zrenovovaný",
      mileage: 15000,
      color: "Bugatti Blue",
    },
    available: true,
    category: "rental",
  },
]

export const rentalPrices: Record<string, RentalPrice[]> = {
  "rolls-royce-phantom-1925": [
    { duration: "4 hodiny", price: 15000, deposit: 50000 },
    { duration: "8 hodin", price: 25000, deposit: 50000 },
    { duration: "24 hodin", price: 40000, deposit: 50000 },
    { duration: "Víkend", price: 70000, deposit: 50000 },
  ],
  "bugatti-type-35-1927": [
    { duration: "4 hodiny", price: 20000, deposit: 100000 },
    { duration: "8 hodin", price: 35000, deposit: 100000 },
    { duration: "24 hodin", price: 60000, deposit: 100000 },
    { duration: "Víkend", price: 100000, deposit: 100000 },
  ],
  "cadillac-v16-1930": [
    { duration: "4 hodiny", price: 18000, deposit: 80000 },
    { duration: "8 hodin", price: 30000, deposit: 80000 },
    { duration: "24 hodin", price: 50000, deposit: 80000 },
    { duration: "Víkend", price: 90000, deposit: 80000 },
  ],
  "packard-eight-1931": [
    { duration: "4 hodiny", price: 12000, deposit: 40000 },
    { duration: "8 hodin", price: 20000, deposit: 40000 },
    { duration: "24 hodin", price: 35000, deposit: 40000 },
    { duration: "Víkend", price: 60000, deposit: 40000 },
  ],
}

export const weddingServices: WeddingService[] = [
  {
    id: "car-rental",
    name: "Pronájem vozu na celou či jenom část svatby",
    description: "Pronájem historického vozu včetně řidiče na váš svatební den.",
    price: 15000,
  },
  {
    id: "car-ride",
    name: "Projížďka vozem ať už v rámci spolujízdy či přímo za volantem",
    description: "Svatební projížďka s možností řízení vozu (pod dohledem).",
    price: 5000,
  },
  {
    id: "car-decoration",
    name: "Výzdoba vozu na přání zákazníka",
    description: "Dekorace vozu podle vašich představ (květiny, stuhy, apod.).",
    price: 3000,
  },
  {
    id: "newlyweds-pickup",
    name: "Vyzvednutí novomanželů z domluveného místa",
    description: "Doprava novomanželů z místa obřadu na místo oslavy.",
    price: 4000,
  },
  {
    id: "car-delivery",
    name: "Dovoz vozu na určené místo",
    description: "Doprava vozu na místo svatby a zpět.",
    price: 2000,
  },
  {
    id: "photo-session",
    name: "Focení ve voze a další",
    description: "Možnost využití vozu pro svatební fotografie.",
    price: 3000,
  },
]
