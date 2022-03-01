/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getResponse = /* GraphQL */ `
  query GetResponse($id: ID!) {
    getResponse(id: $id) {
      id
      userId
      problem
      groupify
      cognify
      technify
      temperature
      date
      response
      saved
      liked
      disliked
      memo
      createdAt
      updatedAt
    }
  }
`;
export const listResponses = /* GraphQL */ `
  query ListResponses(
    $filter: ModelResponseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResponses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        problem
        groupify
        cognify
        technify
        temperature
        date
        response
        saved
        liked
        disliked
        memo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
