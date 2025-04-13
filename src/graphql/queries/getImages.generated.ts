import * as Types from '../graphql-generated-types/types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from '@/graphql/fetcher';
export type GetImagesQueryVariables = Types.Exact<{
  ids: Array<Types.Scalars['ID']['input']> | Types.Scalars['ID']['input'];
}>;


export type GetImagesQuery = { __typename?: 'QueryRoot', nodes: Array<{ __typename?: 'AppliedGiftCard' } | { __typename?: 'Article' } | { __typename?: 'Blog' } | { __typename?: 'Cart' } | { __typename?: 'CartLine' } | { __typename?: 'Collection' } | { __typename?: 'Comment' } | { __typename?: 'Company' } | { __typename?: 'CompanyContact' } | { __typename?: 'CompanyLocation' } | { __typename?: 'ComponentizableCartLine' } | { __typename?: 'ExternalVideo' } | { __typename?: 'GenericFile' } | { __typename?: 'Location' } | { __typename?: 'MailingAddress' } | { __typename?: 'Market' } | { __typename: 'MediaImage', id: string, image?: { __typename?: 'Image', url: any, altText?: string | null, width?: number | null, height?: number | null } | null } | { __typename?: 'MediaPresentation' } | { __typename?: 'Menu' } | { __typename?: 'MenuItem' } | { __typename?: 'Metafield' } | { __typename?: 'Metaobject' } | { __typename?: 'Model3d' } | { __typename?: 'Order' } | { __typename?: 'Page' } | { __typename?: 'Product' } | { __typename?: 'ProductOption' } | { __typename?: 'ProductOptionValue' } | { __typename?: 'ProductVariant' } | { __typename?: 'Shop' } | { __typename?: 'ShopPayInstallmentsFinancingPlan' } | { __typename?: 'ShopPayInstallmentsFinancingPlanTerm' } | { __typename?: 'ShopPayInstallmentsProductVariantPricing' } | { __typename?: 'ShopPolicy' } | { __typename?: 'TaxonomyCategory' } | { __typename?: 'UrlRedirect' } | { __typename?: 'Video' } | null> };



export const GetImagesDocument = `
    query GetImages($ids: [ID!]!) {
  nodes(ids: $ids) {
    ... on MediaImage {
      __typename
      id
      image {
        url
        altText
        width
        height
      }
    }
  }
}
    `;

export const useGetImagesQuery = <
      TData = GetImagesQuery,
      TError = unknown
    >(
      variables: GetImagesQueryVariables,
      options?: Omit<UseQueryOptions<GetImagesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<GetImagesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<GetImagesQuery, TError, TData>(
      {
    queryKey: ['GetImages', variables],
    queryFn: fetcher<GetImagesQuery, GetImagesQueryVariables>(GetImagesDocument).bind(null, variables),
    ...options
  }
    )};
