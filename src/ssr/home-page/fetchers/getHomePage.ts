import { fetcher } from "@/graphql/fetcher";
import { getImages } from "@/graphql/queries/getImages";
import {
  GetHomePageDocument,
  GetHomePageQuery,
  GetHomePageQueryVariables,
  ProductCardFragment,
} from "@/ssr/home-page/graphql/queries/getHomePage.generated";

type TGetHomePageReturn = Promise<{
  data: ProductCardFragment[];
}>;

export const getHomePage = async (): TGetHomePageReturn => {
  const data = await fetcher<GetHomePageQuery, GetHomePageQueryVariables>(
    GetHomePageDocument
  )();

  const variantsImagesIds = data.products.edges
    .flatMap((edge) => edge.node.variants.edges)
    .map(
      (variant) =>
        variant.node.metafields.find(
          (metafield) => metafield?.key === "secondary_image"
        )?.value || ""
    );

  if (variantsImagesIds.length > 0) {
    const images = await getImages(variantsImagesIds);

    data.products.edges.forEach((product) => {
      const variants = product.node.variants.edges.map((variant) => {
        const metafield = variant.node.metafields.find(
          (metafield) => metafield?.key === "secondary_image"
        );

        if (metafield) {
          const imageData = images.data.nodes.find(
            (img) =>
              img?.__typename === "MediaImage" && img.id === metafield.value
          );

          metafield.value =
            imageData?.__typename === "MediaImage"
              ? imageData.image?.url
              : null;
        }

        return {
          ...variant,
        };
      });

      return { ...product, variants };
    });
  }

  return { data: data.products.edges.map((edge) => edge.node) };
};
