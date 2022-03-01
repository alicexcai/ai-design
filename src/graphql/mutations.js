/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createResponse = /* GraphQL */ `
  mutation CreateResponse(
    $input: CreateResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    createResponse(input: $input, condition: $condition) {
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
export const updateResponse = /* GraphQL */ `
  mutation UpdateResponse(
    $input: UpdateResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    updateResponse(input: $input, condition: $condition) {
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
export const deleteResponse = /* GraphQL */ `
  mutation DeleteResponse(
    $input: DeleteResponseInput!
    $condition: ModelResponseConditionInput
  ) {
    deleteResponse(input: $input, condition: $condition) {
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
