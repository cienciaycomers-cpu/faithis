export type ProductCategory = "Prendas" | "Abrigos" | "Accesorios" | "Calzado";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  priceLabel: string;
  color: string;
  tone: string;
  note: string;
  badge?: string;
  visual: string;
};

export const products: Product[] = [
  { id: "01", name: "The Column Dress", category: "Prendas", price: 485, priceLabel: "USD 485", color: "Ivory", tone: "ivory", note: "A sculpted rib-knit silhouette", badge: "New", visual: "dress" },
  { id: "02", name: "The Atelier Blazer", category: "Abrigos", price: 720, priceLabel: "USD 720", color: "Cacao", tone: "cacao", note: "Soft tailoring, precise structure", visual: "blazer" },
  { id: "03", name: "The Second Skin Top", category: "Prendas", price: 210, priceLabel: "USD 210", color: "Dune", tone: "dune", note: "Silk jersey with a quiet sheen", visual: "top" },
  { id: "04", name: "The Wide Leg Trouser", category: "Prendas", price: 390, priceLabel: "USD 390", color: "Charcoal", tone: "charcoal", note: "Fluid wool, effortless movement", visual: "trouser" },
  { id: "05", name: "The Soft Volume Coat", category: "Abrigos", price: 890, priceLabel: "USD 890", color: "Moss", tone: "moss", note: "A considered layer for every season", badge: "Limited", visual: "coat" },
  { id: "06", name: "The Carryall 01", category: "Accesorios", price: 430, priceLabel: "USD 430", color: "Espresso", tone: "espresso", note: "Everyday, elevated", visual: "bag" },
  { id: "07", name: "The Sculpted Heel", category: "Calzado", price: 340, priceLabel: "USD 340", color: "Cocoa", tone: "cocoa", note: "A low line with a strong point", visual: "heel" },
  { id: "08", name: "The Silk Square", category: "Accesorios", price: 120, priceLabel: "USD 120", color: "Limestone", tone: "limestone", note: "A final note in pure silk", visual: "scarf" },
  { id: "09", name: "The Everyday Knit", category: "Prendas", price: 260, priceLabel: "USD 260", color: "Oat", tone: "oat", note: "The piece you return to", visual: "knit" },
  { id: "10", name: "The Line Boot", category: "Calzado", price: 510, priceLabel: "USD 510", color: "Ink", tone: "ink", note: "Polished leather, architectural shape", visual: "boot" },
];

export const categories = ["All pieces", "Prendas", "Abrigos", "Accesorios", "Calzado"] as const;
