import { Button } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";
import AuthStorage from "../utils/authStorage";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username must be at least 4 characters in length")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters in length")
    .required("Password is required"),
});

const SignInForm = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);

      const auth = new AuthStorage();
      await auth.setAccessToken({
        token: data.authenticate.accessToken,
        expiration: data.authenticate.expiresAt,
        user: data.authenticate.user.id,
      });

      //const check = await auth.getAccessToken();
      //console.log("check", check);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <FormikTextInput
              name="username"
              placeholder="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
            <FormikTextInput
              name="password"
              placeholder="Password"
              isSecure={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            <Button onPress={handleSubmit} title="Login" />
          </>
        )}
      </Formik>
    </>
  );
};

export default SignInForm;
