import { JSX } from "react";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}): Promise<JSX.Element> {
  const { slug } = await props.params;

  return <h1 className="text-[40px]">{slug}</h1>;
}
