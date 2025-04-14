"use client";

import ProductCardImage from "@/components/product-card/ProductCardImage";
import ProductCardPrice from "@/components/product-card/ProductCardPrice";
import ProductCardVariantSwitcher from "@/components/product-card/ProductCardVariantSwitcher";
import { getVariantId } from "@/components/product-card/utils/getVariantId";
import {
  ProductCardFragment,
  VariantForProductCardFragment,
} from "@/ssr/home-page/graphql/queries/getHomePage.generated";
import { JSX, useMemo, useState } from "react";

interface ProductCardProps {
  data: ProductCardFragment;
}

export default function ProductCard({ data }: ProductCardProps): JSX.Element {
  const [variant, setVariant] = useState<
    VariantForProductCardFragment | null | undefined
  >(data.variants.edges[0].node);

  const collectionTitle = data.collections.edges[0].node.title;
  const productTitle = data.title;
  const compareAtPrice = variant?.compareAtPrice?.amount || "";
  const price = variant?.price.amount || "";

  const variants = useMemo(
    () => data.variants.edges.map((edge) => edge.node),
    [data.variants.edges]
  );
  const variantId = getVariantId(variant?.id);

  const href = variantId
    ? `/products/${data.handle}?variant=${variantId}`
    : `/products/${data.handle}`;

  const handleSwitchVariant = (variant: VariantForProductCardFragment) => {
    setVariant(variant);
  };

  return (
    <article
      className="p-20"
      itemScope={true}
      itemType="https://schema.org/Product"
    >
      <div className="relative js-variant-switcher-product-sale-label">
        {compareAtPrice > price && (
          <span className="absolute top-[20px] left-[20px] py-[6px] px-[12px] font-bold border-[1px] border-[var(--COLOR-ERROR)] rounded-full text-[var(--COLOR-ERROR)] z-10">
            On Sale!
          </span>
        )}
      </div>
      <ProductCardImage
        primaryImage={variant?.image}
        secondaryImage={variant?.metafields[1]?.value}
        href={href}
      />
      <ProductCardVariantSwitcher
        currentVariantId={variant?.id}
        variants={variants}
        onClickVariant={handleSwitchVariant}
      />
      <div className="flex gap-[6px] flex-col">
        <p className="text-default text-[14px]">{collectionTitle}</p>
        <h3
          itemProp="name"
          className=" text-[var(--COLOR-PRIMARY)] hover:opacity-80"
        >
          <a
            href={href}
            className="block text-[16px] text-[var(--COLOR-PRIMARY)]"
          >
            {productTitle}
          </a>
        </h3>
        <ProductCardPrice
          isSoldOut={!!variant?.availableForSale}
          price={variant?.price.amount || ""}
          compareAtPrice={variant?.compareAtPrice?.amount || ""}
          currencyCode={variant?.price.currencyCode || "USD"}
        />
      </div>
    </article>
  );
}
