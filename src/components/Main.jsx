//import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Route, Redirect } from "react-router-native";

import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import theme from "../theme";
import SignIn from "./SignIn";

const styles = StyleSheet.create({
  flexContainer: {
    flexGrow: 0,
    flexShrink: 1,
  },
  mainBackground: {
    backgroundColor: theme.colors.backgroundLight,
  },
});

const Main = () => {
  return (
    <>
      <View>
        <AppBar />
      </View>
      <View style={styles.mainBackground}>
        <Route exact path="/">
          <RepositoryList />
        </Route>

        <Route path="/login">
          <SignIn />
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </View>
    </>
  );
};

export default Main;
