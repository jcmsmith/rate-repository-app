import { useMutation } from "@apollo/client";

import { LOGIN } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.error("mutation error:", error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) => {
    return await mutate({ variables: { credentials: { username, password } } });
  };

  return [signIn, result];
};

export default useSignIn;
