import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation authenticate($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      user {
        id
      }
      accessToken
      expiresAt
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      userId
      createdAt
      text
      repositoryId
    }
  }
`;
