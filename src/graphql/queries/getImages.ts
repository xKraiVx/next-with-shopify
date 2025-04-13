import { fetcher } from "@/graphql/fetcher";
import {
  GetImagesDocument,
  GetImagesQuery,
  GetImagesQueryVariables,
} from "@/graphql/queries/getImages.generated";

type TGetHomePageReturn = Promise<{
  data: GetImagesQuery;
}>;

export const getImages = async (ids: string[]): TGetHomePageReturn => {
  const data = await fetcher<GetImagesQuery, GetImagesQueryVariables>(
    GetImagesDocument,
    {
      ids,
    }
  )();

  return { data };
};
