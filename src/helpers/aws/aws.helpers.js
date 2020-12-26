export {
  getHeroHeadInfo,
  getHeroGeneralInfo,
  getHeroSkills,
  getHeroBackgroundData,
  getHeroSkins,
  listHeros,
  listHerosHeadInfos,
  getAllHeroData,
  listHeroesWithClass,
} from "./aws.helpers.heros";
export {
  createArtifact,
  getArtifact,
  listArtifacts,
  listOrderedArtifacts,
} from "./aws.helpers.artifacts";
export {
  listPlugPosts,
  typePlugsByOrder,
  allPlugsByOrder,
} from "./aws.helpers.plugposts";
export { allTempNewsByOrder } from "./aws.helpers.tempKRNews";

export const RESULT_NULL = "Error: result is null";

// Imports
import { API, graphqlOperation } from "@aws-amplify/api";

export const AWSoperation = async (createEvent, eventDetails) => {
  try {
    let { data } = await API.graphql(
      graphqlOperation(createEvent, eventDetails)
    );
    const contextSplit = createEvent.split("{");
    const contextName = contextSplit[1].split(/[{(]/g)[0].trim();
    let result = data[contextName];
    if (result == null) throw RESULT_NULL;
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
    throw error;
  }
};
