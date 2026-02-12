import type { APIRoute } from "astro";
import { generateStarFieldSVG } from "../lib/stars";

export const GET: APIRoute = () => {
  return new Response(generateStarFieldSVG(), {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
};
