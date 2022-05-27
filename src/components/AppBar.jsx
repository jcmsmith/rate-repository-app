import { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";

import useUser from "../hooks/useUser";
import { AppBarText } from "./Text";
import theme from "../theme";

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
  const [user, setUser] = useState();
  const { getCurrentUser } = useUser();

  useEffect(() => {
    getCurrentUser()
      .then((result) => {
        if (result && result.me !== null) {
          setUser(result.me.username);
        }
      })
      .catch((reason) =>
        console.log("getCurrentUser promise rejection", reason)
      );
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ScrollView horizontal>
          {user ? (
            <AppBarTab text="Logout" url="/logout" />
          ) : (
            <AppBarTab text="Login" url="/login" />
          )}
          <AppBarTab text="Repositories" url="/" />
        </ScrollView>
      </View>
    </>
  );
};

const AppBarTab = ({ text, url }) => {
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

export default AppBar;
