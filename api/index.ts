import { Hono } from "hono";
import { handle } from "hono/vercel";

import staticData from "./data.json";

export const config = {
  runtime: "edge",
};

const VERCEL_ENV = process.env.VERCEL_ENV === "production";

const baseUrl = VERCEL_ENV
  ? "https://deteksi-kue-api.vercel.app/"
  : "http://localhost:3000/";

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  const data = staticData.map((item) => ({
    ...item,
    image: baseUrl + item.image,
  }));

  return c.json(data);
});

export default handle(app);
