import { gql } from "@apollo/client";

import { REPOSITORY_DETAILS } from "./fragments";

export const GET_ALLREPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_CURRENTUSER = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
    }
  }
  ${REPOSITORY_DETAILS}
`;
