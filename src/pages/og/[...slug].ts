import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const entries = await getCollection("docs");

const pages = Object.fromEntries(entries.map(({ data, id }) => [id, { data }]));

export const { getStaticPaths, GET } = OGImageRoute({
  pages,
  param: "slug",
  getImageOptions: (_path, page: (typeof pages)[number]) => {
    return {
      title: page.data.title,
      description: page.data.description,
      logo: {
        path: "./public/logotype/logotype-dark.png",
        size: [400],
      },
      bgGradient: [[24, 24, 24]],
      border: { color: [63, 63, 70], width: 20 },
      font: {
        title: {
          size: 72,
          lineHeight: 1.2,
          weight: "Medium",
          color: [255, 255, 255],
        },
      },
      padding: 120,
    };
  },
});
