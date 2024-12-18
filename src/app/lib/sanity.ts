import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
  apiVersion: "2024-12-18",
  dataset: "production",
  projectId: "li3asizp",
  useCdn: false,
});

const builder = ImageUrlBuilder(client);
export const URLFor = (source: SanityImageSource) => {
  return builder.image(source);
};
