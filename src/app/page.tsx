import { getHomePage } from "@/ssr/home-page/fetchers/getHomePage";
import HomePage from "@/ssr/home-page/HomePage";

export default async function Home() {
  const { data } = await getHomePage();

  return <HomePage data={data} />;
}
