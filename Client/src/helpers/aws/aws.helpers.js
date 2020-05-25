import { API, graphqlOperation } from "aws-amplify";

export const createArtifact = `mutation CreateArtifact(
  $name: String!, 
  $description: [String]!, 
  $story: String!, 
  $drop: String!,
  $release: String! 
  ) {
  createArtifact( input: {
    name: $name, 
    description: $description, 
    story: $story, 
    release: $release, 
    drop: $drop
  })
    {name}
}
`;

export const getArtifact = `query GetArtifact($name: String!){
  getArtifact(name: $name){
    name
    description
    story
    release
    drop
  }
}`;

export const listArtifacts = `query ListArtifacts
  {listArtifacts(limit: 84){
    items {
      name
      release
      drop
    }
  }
}`;

export const AWSoperation = async (createEvent, eventDetails) => {
  try {
    return await API.graphql(graphqlOperation(createEvent, eventDetails));
  } catch (error) {
    console.log(error);
  }
};
