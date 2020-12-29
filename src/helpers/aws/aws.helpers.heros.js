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
    npcBonus{
      name
      effect
    }
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
  listHeros(nextToken: $nextToken limit: 50){
    items{
      name
    }
    nextToken
  }
}`;

export const listHerosHeadInfos = `query ListHeroesHeadInfo($nextToken: String){
  listHeros(nextToken: $nextToken limit: 50){
    items{
      name
      title
      position
      class
      damageType
    }
    nextToken
  }
}`;

const skillCompleteRequest = `{
  id
  light
  dark
  books
  skillInfo {
    description
    name
    skillNumber
    cooldown
    cost
    linked
  }
  uniqueTreasure {
    name
    effect
    story
  }
}`;

export const getAllHeroData = `query GetAllHeroData($name: String!) {
  getHero(name: $name){
    name
    title
    class
    damageType
    position
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
    uniqueWeapon{
      name
      effect
      story
    }
    soulWeapon{
      activation
      advancement0
      advancement1
      advancement2
      cd
      charges
      story
    }
    skill1${skillCompleteRequest}
    skill2${skillCompleteRequest}
    skill3${skillCompleteRequest}
    skill4${skillCompleteRequest}
    dark
    light
    story
    skins
  }
}`;

export const listHeroesWithClass = `query ListHeroesWithClass($nextToken: String){
  listHeros(nextToken: $nextToken limit: 50){
    items{
      name
      class
    }
    nextToken
  }
}`;
