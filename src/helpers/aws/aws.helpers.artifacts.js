export const createArtifact = `mutation CreateArtifact(
  $name: String!, 
  $description: [String]!, 
  $story: String!, 
  $drop: String!,
  $release: String!
  $type: String!
  ) {
  createArtifact( input: {
    name: $name, 
    description: $description, 
    story: $story, 
    release: $release, 
    drop: $drop,
    type: $type
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

export const listArtifacts = `query ListArtifacts{
  listArtifacts(limit: 84){
    items {
      name
      release
      drop
    }
  }
}`;

// TODO: Limitless
export const listOrderedArtifacts = `query OrderedArtifacts{
  artifactsByOrder(type:"Artifact"){
    items{
      name
      release
      drop
      type
    }
  }
}
`;

// export const listOrderedArtifacts = `query OrderedArtifacts(
//   $limit: Int
//   $nextToken: String
//   ){
//   artifactsByOrder(limit: $limit type:"Artifact" nextToken: $nextToken){
//     items{
//       name
//       release
//       drop
//     }
//     nextToken
//   }
// }
// `;
