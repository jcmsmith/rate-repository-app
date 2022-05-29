import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_ALLREPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy, orderDirection) => {
  const [repositories, setRepositories] = useState();

  const { error } = useQuery(GET_ALLREPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setRepositories(data.repositories);
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error) return [`Error! ${error.message}`];

  console.log("repos", repositories.edges[0], repositories.edges[1]);

  return { repositories };
};

export default useRepositories;
