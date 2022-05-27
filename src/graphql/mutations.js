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
