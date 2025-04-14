import * as Types from "../../../../graphql/graphql-generated-types/types";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetcher } from "@/graphql/fetcher";
export type GetHomePageQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetHomePageQuery = {
  __typename?: "QueryRoot";
  products: {
    __typename?: "ProductConnection";
    edges: Array<{
      __typename?: "ProductEdge";
      node: {
        __typename?: "Product";
        title: string;
        handle: string;
        collections: {
          __typename?: "CollectionConnection";
          edges: Array<{
            __typename?: "CollectionEdge";
            node: { __typename?: "Collection"; title: string };
          }>;
        };
        variants: {
          __typename?: "ProductVariantConnection";
          edges: Array<{
            __typename?: "ProductVariantEdge";
            node: {
              __typename?: "ProductVariant";
              id: string;
              title: string;
              availableForSale: boolean;
              compareAtPrice?: {
                __typename?: "MoneyV2";
                amount: any;
                currencyCode: Types.CurrencyCode;
              } | null;
              price: {
                __typename?: "MoneyV2";
                amount: any;
                currencyCode: Types.CurrencyCode;
              };
              image?: {
                __typename?: "Image";
                id?: string | null;
                altText?: string | null;
                height?: number | null;
                width?: number | null;
                url: any;
              } | null;
              metafields: Array<{
                __typename?: "Metafield";
                key: string;
                value: string;
              } | null>;
            };
          }>;
        };
      };
    }>;
  };
};

export type ProductCardFragment = {
  __typename?: "Product";
  title: string;
  handle: string;
  collections: {
    __typename?: "CollectionConnection";
    edges: Array<{
      __typename?: "CollectionEdge";
      node: { __typename?: "Collection"; title: string };
    }>;
  };
  variants: {
    __typename?: "ProductVariantConnection";
    edges: Array<{
      __typename?: "ProductVariantEdge";
      node: {
        __typename?: "ProductVariant";
        id: string;
        title: string;
        availableForSale: boolean;
        compareAtPrice?: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: Types.CurrencyCode;
        } | null;
        price: {
          __typename?: "MoneyV2";
          amount: any;
          currencyCode: Types.CurrencyCode;
        };
        image?: {
          __typename?: "Image";
          id?: string | null;
          altText?: string | null;
          height?: number | null;
          width?: number | null;
          url: any;
        } | null;
        metafields: Array<{
          __typename?: "Metafield";
          key: string;
          value: string;
        } | null>;
      };
    }>;
  };
};

export type VariantForProductCardFragment = {
  __typename?: "ProductVariant";
  id: string;
  title: string;
  availableForSale: boolean;
  compareAtPrice?: {
    __typename?: "MoneyV2";
    amount: any;
    currencyCode: Types.CurrencyCode;
  } | null;
  price: {
    __typename?: "MoneyV2";
    amount: any;
    currencyCode: Types.CurrencyCode;
  };
  image?: {
    __typename?: "Image";
    id?: string | null;
    altText?: string | null;
    height?: number | null;
    width?: number | null;
    url: any;
  } | null;
  metafields: Array<{
    __typename?: "Metafield";
    key: string;
    value: string;
  } | null>;
};

export type PriceForProductCardFragment = {
  __typename?: "MoneyV2";
  amount: any;
  currencyCode: Types.CurrencyCode;
};

export type ImageForProductCardFragment = {
  __typename?: "Image";
  id?: string | null;
  altText?: string | null;
  height?: number | null;
  width?: number | null;
  url: any;
};

export const PriceForProductCardFragmentDoc = `
    fragment PriceForProductCard on MoneyV2 {
  amount
  currencyCode
}
    `;
export const ImageForProductCardFragmentDoc = `
    fragment ImageForProductCard on Image {
  id
  altText
  height
  width
  url
}
    `;
export const VariantForProductCardFragmentDoc = `
    fragment VariantForProductCard on ProductVariant {
  id
  title
  availableForSale
  compareAtPrice {
    ...PriceForProductCard
  }
  price {
    ...PriceForProductCard
  }
  image {
    ...ImageForProductCard
  }
  metafields(
    identifiers: [{key: "variant_color", namespace: "custom"}, {key: "secondary_image", namespace: "custom"}]
  ) {
    key
    value
  }
}
    ${PriceForProductCardFragmentDoc}
${ImageForProductCardFragmentDoc}`;
export const ProductCardFragmentDoc = `
    fragment ProductCard on Product {
  title
  handle
  collections(first: 1) {
    edges {
      node {
        title
      }
    }
  }
  variants(first: 10) {
    edges {
      node {
        ...VariantForProductCard
      }
    }
  }
}
    ${VariantForProductCardFragmentDoc}`;
export const GetHomePageDocument = `
    query GetHomePage {
  products(first: 10) {
    edges {
      node {
        ...ProductCard
      }
    }
  }
}
    ${ProductCardFragmentDoc}`;

export const useGetHomePageQuery = <TData = GetHomePageQuery, TError = unknown>(
  variables?: GetHomePageQueryVariables,
  options?: Omit<
    UseQueryOptions<GetHomePageQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetHomePageQuery, TError, TData>["queryKey"];
  }
) => {
  return useQuery<GetHomePageQuery, TError, TData>({
    queryKey:
      variables === undefined ? ["GetHomePage"] : ["GetHomePage", variables],
    queryFn: fetcher<GetHomePageQuery, GetHomePageQueryVariables>(
      GetHomePageDocument
    ).bind(null),
    ...options,
  });
};
