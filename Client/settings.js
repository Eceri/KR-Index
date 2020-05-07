export const settings = () => ({
  api:
    process.env.NODE_ENV === "production"
      ? "https://oozhepz1vj.execute-api.us-east-1.amazonaws.com/dev/"
      : "http://localhost:8080/api/",
  socket:
    process.env.NODE_ENV === "production"
      ? "https://ropatr.com"
      : "http://localhost:8080",
});
