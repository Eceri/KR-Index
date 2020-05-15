export const settings = () => ({
  api:
    process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/api/",
  socket:
    process.env.NODE_ENV === "production"
      ? "https://ropatr.com"
      : "http://localhost:8080",
});
