import { useEffect } from "react";
import { useNavigate } from "react-router-native";

import { useUser } from "../hooks/useUser";

const SignOut = () => {
  const { signOut } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      console.log("signing out");
      await signOut();
      navigate("/");
    };

    logout();
  }, []);
};

export default SignOut;
