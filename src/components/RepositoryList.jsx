import { FlatList, Pressable } from "react-native";
import { useNavigate } from "react-router-native";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return <RepositoryListContainer repositories={repositories} />;
};

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item, _index, _separators }) => {
        return (
          <>
            <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
              <RepositoryItem key={item.id} item={item} />
            </Pressable>
          </>
        );
      }}
      testID="repositoryList"
    />
  );
};

export default RepositoryList;
