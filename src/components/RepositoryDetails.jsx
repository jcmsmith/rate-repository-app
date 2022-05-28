import { useState } from "react";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import { Linky } from "./Link";

import { Text } from "./Text";
import RepositoryItem from "./RepositoryItem";

const RepositoryDetails = () => {
  const [repo, setRepo] = useState(null);
  const param = useParams();

  console.log(param);

  const { loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: param.id },
    onError: (error) => {
      console.error("Get repo by id error:", error);
    },
    onCompleted: (data) => {
      if (data && data.repository !== null) {
        setRepo(data.repository);
      }
    },
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return repo ? (
    <>
      <RepositoryItem item={repo} />
      <Linky text="Open repo" url={repo.url} />
    </>
  ) : null;
};

export default RepositoryDetails;
