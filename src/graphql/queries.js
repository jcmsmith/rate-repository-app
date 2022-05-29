import { gql } from "@apollo/client";

import { REPOSITORY_DETAILS, REPOSITORY_REVIEWS } from "./fragments";

export const GET_ALLREPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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

export const GET_REVIEWS = gql`
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      reviews {
        ...RepositoryReviews
      }
    }
  }
  ${REPOSITORY_REVIEWS}
`;
