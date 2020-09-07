import { API, graphqlOperation } from "aws-amplify";

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

export const getHeroHeadInfo = `query GetHeroHeadInfo($name: String!){
  getHero(name: $name){
    name
    title
    position
    class
    damageType
  }
}`;
const skillRequest = `{
  light
  books
  skillInfo{
    description
    name
    cooldown
    cost
    skillNumber
    linked
  }
  dark
  id
  uniqueTreasure{
    name
    effect
  }
}`;

export const getHeroGeneralInfo = `query GetHeroGeneralInfo($name: String!){
  getHero(name: $name){
    class
    uniqueWeapon{
      name
      effect
    }
    soulWeapon{
      activation
      advancement0
      advancement1
      advancement2
      cd
      charges
    }
    skill1${skillRequest}
    skill2${skillRequest}
    skill3${skillRequest}
    skill4${skillRequest}
    light
    dark
  }
}`;

export const getHeroSkills = `query GetHeroSkills($name: String!){
  getHero(name: $name){
    class
    skill1${skillRequest}
    skill2${skillRequest}
    skill3${skillRequest}
    skill4${skillRequest}
    light
    dark
  }
}`;

const utStoryRequest = `{
  uniqueTreasure{
    name
    story
  }
}`;
export const getHeroBackgroundData = `query GetHeroBackgroundData($name: String!){
  getHero(name: $name){
    name
    title
    profile{
      age
      birthday
      constellation
      dislikes
      likes
      gender
      height
      race
    }
    story
    uniqueWeapon{
      name
      story
    }
    soulWeapon{
      story
    }
    skill1${utStoryRequest}
    skill2${utStoryRequest}
    skill3${utStoryRequest}
    skill4${utStoryRequest}
  }
}`;

export const getHeroSkins = `query GetHeroSkins($name: String!){
  getHero(name: $name){
    skins
  }
}`;

export const listHeros = `query ListHeros($nextToken: String){
  listHeros(nextToken: $nextToken limit: 95){
    items{
      name
    }
    nextToken
  }
}`;

export const listPlugPosts = `query ListPlugPosts($nextToken: String){
  listPlugPosts(filter: {timestamp: {gt: 40}} nextToken: $nextToken){
    items {
      timestamp
      thumbnail
      title
      url
    }
    nextToken
  }
}`;

export const typePlugsByOrder = `query TypePlugsByOrder($type: String){
  typePlugsByOrder(type: $type sortDirection: DESC){
    items {
      title
      url
      postID
      thumbnail
    }
  }
}`;

export const allPlugsByOrder = `query TypePlugsByOrder{
  typePlugsByOrder(master: "master" sortDirection: DESC){
    items {
      title
      url
      postID
      thumbnail
    }
  }
}`;

export const AWSoperation = async (createEvent, eventDetails) => {
  try {
    let { data } = await API.graphql(
      graphqlOperation(createEvent, eventDetails)
    );
    const contextSplit = createEvent.split("{");
    const contextName = contextSplit[1].split(/[{(]/g)[0].trim();
    let result = data[contextName];
    const isList = data[contextName].items !== undefined ? true : false;
    let hasNextToken = false;

    if (eventDetails !== undefined) {
      hasNextToken = Object.keys(eventDetails).includes("nextToken");
    }
    if (isList && hasNextToken === false) {
      result = result.items;
    }

    if (result === null) {
      throw Error;
    } else {
      return result;
    }
  } catch (error) {
    return new Error(error);
  }
};
