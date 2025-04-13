import ProductCard from "@/components/product-card/ProductCard";
import { ProductCardFragment } from "@/ssr/home-page/graphql/queries/getHomePage.generated";
import { JSX } from "react";

interface HomePageProps {
  data: ProductCardFragment[];
}

export default function HomePage({ data }: HomePageProps): JSX.Element {
  return (
    <div>
      {data.map((product) => (
        <ProductCard key={product.handle} data={product} />
      ))}
    </div>
  );
}
