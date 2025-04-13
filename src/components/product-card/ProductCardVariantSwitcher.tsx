import { VariantForProductCardFragment } from "@/ssr/home-page/graphql/queries/getHomePage.generated";
import { JSX } from "react";
import cn from "classnames";

interface ProductCardVariantSwitcherProps {
  currentVariantId: string | null | undefined;
  variants: VariantForProductCardFragment[];
  onClickVariant: (variant: VariantForProductCardFragment) => void;
}

export default function ProductCardVariantSwitcher({
  currentVariantId,
  variants,
  onClickVariant,
}: ProductCardVariantSwitcherProps): JSX.Element {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {variants.map((variant) => (
        <button
          key={variant.id}
          className={cn(
            "relative inline-flex justify-center items-center h-[24px] w-[24px] rounded-full border-[1px] hover:opacity-80 transition-opacity cursor-pointer",
            {
              "border-primary": currentVariantId === variant.id,
              "border-transparent": currentVariantId !== variant.id,
            }
          )}
          onClick={() => onClickVariant(variant)}
        >
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 block w-[20px] h-[20px] rounded-full"
            style={{ backgroundColor: variant.metafields[0]?.value }}
          ></span>
        </button>
      ))}
    </div>
  );
}
