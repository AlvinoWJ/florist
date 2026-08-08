import { getAdminProducts } from "@/lib/api/products";
import { ProdukManager } from "@/features/admin/components/ProdukManager";

export default async function AdminProdukPage() {
  const products = await getAdminProducts();
  return <ProdukManager products={products} />;
}
