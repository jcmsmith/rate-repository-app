import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          ownerAvatarUrl
          url
          description
          fullName
          language
          id
        }
      }
    }
  }
`;