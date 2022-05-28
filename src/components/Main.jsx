//import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Routes, Route, Navigate } from "react-router-native";

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
        <Routes>
          <Route exact path="/" element={<RepositoryList />} />

          <Route exact path="/login" element={<SignIn />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </>
  );
};

export default Main;
