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

export const listOrderedArtifacts = `query OrderedArtifacts(
  $limit: Int
  $nextToken: String
  ){
  artifactsByOrder(limit: $limit type:"Artifact" nextToken: $nextToken){
    items{
      name
      release
      drop
    }
    nextToken
  }
}
`;

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
    let res = await API.graphql(graphqlOperation(createEvent, eventDetails));
    const contextSplit = createEvent.split("{");
    const contextName = contextSplit[1].split(/[{(]/g)[0];
    if (res.data[contextName.trim()] === null) {
      throw Error;
    } else {
      return res;
    }
  } catch (error) {
    return new Error(error);
  }
};

export const AWSoperationLists = async (listOperation, token, limit) => {
  let nextToken = token;
  let items = [];

  // Get operation name from query
  const operationSplit = listOperation.split("{")[1];
  const operationName = operationSplit.split("(")[0].trim();
  try {
    const result = await AWSoperation(listOperation, {
      nextToken,
      limit,
    });
    nextToken = result.data[operationName].nextToken;
    items = items.concat(result.data[operationName].items);
    return result.data[operationName];
  } catch (err) {
    console.error(err);
    return null;
  }
};
