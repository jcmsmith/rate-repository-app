import { useMutation, useApolloClient } from "@apollo/client";

import { LOGIN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const [authenticateMutation, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.error("login mutation error:", error);
    },
  });

  const signIn = async (username, password) => {
    const { data } = await authenticateMutation({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken({
      token: data.authenticate.accessToken,
      expiresAt: data.authenticate.expiresAt,
      user: data.authenticate.user.id,
    });
    await client.resetStore();
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
