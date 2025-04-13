import { ImageForProductCardFragment } from "@/ssr/home-page/graphql/queries/getHomePage.generated";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

interface ProductCardImageProps {
  primaryImage: ImageForProductCardFragment | null | undefined;
  secondaryImage: string | undefined;
  href: string;
  altText?: string;
}

export default function ProductCardImage({
  primaryImage,
  secondaryImage,
  href,
  altText,
}: ProductCardImageProps): JSX.Element {
  return (
    <Link
      href={href}
      className="block overflow-hidden border-[1px] p-[20px] border-gray-200 rounded-[10px] mb-4"
    >
      <div className="relative w-full h-[340px]">
        <Image
          src={primaryImage?.url}
          alt={altText || primaryImage?.altText || "Product Image"}
          width={primaryImage?.width || 350}
          height={primaryImage?.height || 350}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 bg-white"
          loading="lazy"
          itemProp="image"
        />
        <Image
          src={secondaryImage || ""}
          alt={altText || primaryImage?.altText || "Product Image"}
          width={primaryImage?.width || 350}
          height={primaryImage?.height || 350}
          className="absolute opacity-0 hover:opacity-100 inset-0 w-full h-full object-contain transition-opacity duration-300 bg-white"
          loading="lazy"
          itemProp="image"
        />
      </div>
    </Link>
  );
}
