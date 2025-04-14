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
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(price));

  const formattedCompareAtPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(compareAtPrice));

  return (
    <div>
      <p className="text-default">
        <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <meta itemProp="priceCurrency" content={currencyCode} />
          <span className="flex gap-2 text-[14px]">
            {!isSoldOut ? (
              <span className="text-[var(--COLOR-ERROR)]">Sold Out</span>
            ) : compareAtPrice > price ? (
              <>
                <span className="line-through text-default" itemProp="price">
                  {formattedCompareAtPrice}
                </span>
                <span className="text-[var(--COLOR-ERROR)]" itemProp="sale">
                  {formattedPrice}
                </span>
              </>
            ) : (
              <span itemProp="price">{formattedPrice}</span>
            )}
          </span>
        </span>
      </p>
    </div>
  );
}
