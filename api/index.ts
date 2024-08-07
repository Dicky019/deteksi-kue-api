import { Hono } from "hono";
import { handle } from "hono/vercel";

import staticData from "./data.json";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  const VERCEL_ENV = process.env.VERCEL_ENV === "production";
  const prefixUrl = VERCEL_ENV ? "https://" : "http://";
  const data = staticData.map((item) => ({
    ...item,
    image: prefixUrl + process.env.VERCEL_URL + "/" + item.image,
  }));

  return c.json(data);
});

export default handle(app);
