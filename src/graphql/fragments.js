import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    url
    ownerAvatarUrl
    description
    fullName
    watchersCount
    openIssuesCount
    createdAt
    name
    id
    language
    userHasReviewed
  }
`;

export const USER = gql`
  fragment User on User {
    id
    username
    createdAt
    reviewCount
  }
`;

export const REVIEW = gql`
  fragment Review on ReviewEdge {
    node {
      id
      text
      rating
      createdAt
      user {
        ...User
      }
    }
  }
  ${USER}
`;

export const REPOSITORY_REVIEWS = gql`
  fragment RepositoryReviews on ReviewConnection {
    totalCount
    edges {
      ...Review
      cursor
    }
    pageInfo {
      ...PageInfo
    }
  }
  ${REVIEW}
  ${PAGE_INFO}
`;

export const PAGE_INFO = gql`
  fragment PageInfo on PageInfo {
    startCursor
    endCursor
    hasPreviousPage
    hasNextPage
  }
`;
