import { strapi as createStrapiClient } from "@strapi/client";

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";
const BASE_API_URL = STRAPI_URL + "/api";

const sdk = createStrapiClient({
  baseURL: BASE_API_URL,
});

export default sdk;
