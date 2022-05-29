import { useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_ALLREPOSITORIES } from "../graphql/queries";

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
  const [repositories, setRepositories] = useState();

  const { error } = useQuery(GET_ALLREPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
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
