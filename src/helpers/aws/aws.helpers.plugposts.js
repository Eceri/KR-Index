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

export const typePlugsByOrder = `query TypePlugsByOrder($type: String, $nextToken: String){
  typePlugsByOrder(type: $type sortDirection: DESC nextToken: $nextToken){
    items {
      title
      url
      postID
      thumbnail
    }
    nextToken
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
