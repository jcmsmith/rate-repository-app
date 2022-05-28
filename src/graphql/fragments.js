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
