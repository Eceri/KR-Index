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

export const listArtifacts = `query ListArtifacts{
  listArtifacts(limit: 84){
    items {
      name
      release
      drop
    }
  }
}`;

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
const utStoryRequest = `{
  uniqueTreasure{
    name
    story
  }
}`;
export const getHeroStories = `query GetHeroStories($name: String!){
  getHero(name: $name){
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

export const listPlugPosts = `query ListPlugPosts($nextToken: String!){
  listPlugGames(filter: {timestamp: {gt: 24}} nextToken: $nextToken){
    items {
      timestamp
      thumbnail
      title
      url
    }
    nextToken
  }
}`;

export const AWSoperation = async (createEvent, eventDetails) => {
  try {
    return await API.graphql(graphqlOperation(createEvent, eventDetails));
  } catch (error) {
    console.log(error);
  }
};
