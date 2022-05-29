import { gql } from "@apollo/client";

import { REPOSITORY_DETAILS, REPOSITORY_REVIEWS, PAGE_INFO } from "./fragments";

export const GET_ALLREPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
    $first: Int
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: $first
    ) {
      pageInfo {
        ...PageInfo
      }
      edges {
        cursor
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${PAGE_INFO}
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
  query repository($repositoryId: ID!, $after: String, $first: Int) {
    repository(id: $repositoryId) {
      id
      reviews(after: $after, first: $first) {
        ...RepositoryReviews
      }
    }
  }
  ${REPOSITORY_REVIEWS}
`;
