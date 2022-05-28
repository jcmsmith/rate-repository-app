import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_ALLREPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { error } = useQuery(GET_ALLREPOSITORIES, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setRepositories(data.repositories);
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error) return [`Error! ${error.message}`];

  return { repositories };
};

export default useRepositories;
