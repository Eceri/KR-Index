export const settings = () => ({
  api:
    process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/api/",
});
