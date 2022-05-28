import { useState } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link, useNavigate } from "react-router-native";
import Constants from "expo-constants";
import { useQuery } from "@apollo/client";

import { AppBarText } from "./Text";
import theme from "../theme";
import { GET_CURRENTUSER } from "../graphql/queries";
import useAuth from "../hooks/useAuth";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    paddingLeft: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundDark,
  },
  tab: {
    marginRight: 8,
  },
});

const AppBar = () => {
  return (
    <>
      <View style={styles.container}>
        <ScrollView horizontal>
          <AuthTab />
          <LinkTab text="Repositories" url="/" />
        </ScrollView>
      </View>
    </>
  );
};

const LinkTab = ({ text, url }) => {
  return (
    <>
      <View style={styles.tab}>
        <Pressable>
          <Link to={url}>
            <AppBarText text={text} />
          </Link>
        </Pressable>
      </View>
    </>
  );
};

const AuthTab = () => {
  const [user, setUser] = useState(null);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useQuery(GET_CURRENTUSER, {
    onError: (error) => console.log("userquery error", error),
    onCompleted: (data) => {
      if (data && data.me !== null) {
        setUser(data.me.id);
      }
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    navigate("/");
  };

  //console.log("currentUser", user);

  return (
    <>
      <View style={styles.tab}>
        {user ? (
          <Pressable onPressOut={handleLogout}>
            <AppBarText text={"Logout"} />
          </Pressable>
        ) : (
          <LinkTab text={"Login"} url={"/login"} />
        )}
      </View>
    </>
  );
};

export default AppBar;
