import ProductCard from "@/components/product-card/ProductCard";
import { ProductCardFragment } from "@/ssr/home-page/graphql/queries/getHomePage.generated";
import { JSX } from "react";

interface HomePageProps {
  data: ProductCardFragment[];
}

export default function HomePage({ data }: HomePageProps): JSX.Element {
  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
      {data.map((product) => (
        <ProductCard key={product.handle} data={product} />
      ))}
    </div>
  );
}
