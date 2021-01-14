export const allTempNewsByOrder = `query AllTempNewsByOrder($nextToken: String){
  allTempNewsByOrder(master: "master" sortDirection: DESC nextToken: $nextToken){
    items {
      title
      url
      time
      type
    }
    nextToken
  }
}`;
