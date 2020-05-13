export const settings = () => ({
  api:
    process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/api/",
  socket:
    process.env.NODE_ENV === "production"
      ? "https://ropatr.com"
      : "http://localhost:8080",
});
import Amplify from "aws-amplify";
export const aws = () => {
  const config = {
    // ...
    aws_appsync_graphqlEndpoint:
      "https://gd3mlj54t5d4dmsodj4zmkwbyy.appsync-api.eu-central-1.amazonaws.com/graphql",
    aws_appsync_region: "eu-central-1",
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: "",
    // ...
  };
  Amplify.configure(config);
};
