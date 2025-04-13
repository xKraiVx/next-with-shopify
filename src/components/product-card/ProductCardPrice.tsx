import { JSX } from "react";

interface ProductCardPriceProps {
  isSoldOut: boolean;
  price: string;
  compareAtPrice: string;
  currencyCode: string;
}

export default function ProductCardPrice({
  isSoldOut,
  price,
  compareAtPrice,
  currencyCode,
}: ProductCardPriceProps): JSX.Element {
  return (
    <div className="product-card__image">
      <p className="text-default">
        <span
          className="product-card__price-value"
          itemProp="offers"
          itemScope
          itemType="https://schema.org/Offer"
        >
          <meta itemProp="priceCurrency" content={currencyCode} />
          <span className="flex gap-2 text-[14px]">
            {!isSoldOut ? (
              <span className="text-error">Sold Out</span>
            ) : compareAtPrice > price ? (
              <>
                <span className="line-through text-default" itemProp="price">
                  {compareAtPrice}
                </span>
                <span className="text-error" itemProp="sale">
                  {price}
                </span>
              </>
            ) : (
              <span itemProp="price">{price}</span>
            )}
          </span>
        </span>
      </p>
    </div>
  );
}
