import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import { /*Subheading Text, TextBold*/ AppBarText } from "./Text";
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
  return (
    <>
      <View style={styles.container}>
        <ScrollView horizontal>
          <AppBarTab text="Login" url="/login" />
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
