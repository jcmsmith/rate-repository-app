import { useMutation, useLazyQuery, useApolloClient } from "@apollo/client";

import { GET_CURRENTUSER } from "../graphql/queries";
import { LOGIN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useUser = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();

  const [authenticate, _result] = useMutation(LOGIN, {
    onError: (error) => {
      console.error("login mutation error:", error);
    },
  });
  const [userQuery] = useLazyQuery(GET_CURRENTUSER, {
    onError: (error) => console.log("userquery error", error),
    onCompleted: (data) => console.log("userQuery oncompleted", data),
  });

  const signIn = async (username, password) => {
    const { data } = await authenticate({
      variables: { credentials: { username, password } },
    });
    console.log("authenticate data", data);
    await authStorage.setAccessToken(`Bearer ${data.authenticate.accessToken}`);
    await client.resetStore();

    const check = await authStorage.getAccessToken();
    console.log("check", check);
    // const check2 = await getCurrentUser();
    // console.log("check2", check2);
    //return data;
  };

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await client.resetStore();
  };

  const getCurrentUser = async () => {
    const { data } = await userQuery();
    console.log("user query result", data);
    return data;
  };

  return { signIn, signOut, getCurrentUser };
};

export default useUser;
