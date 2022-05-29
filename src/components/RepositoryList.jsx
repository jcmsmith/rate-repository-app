import { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { Picker } from "@react-native-picker/picker";

import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const { repositories } = useRepositories(orderBy, orderDirection);

  const listHeader = () => {
    return (
      <>
        <Picker
          selectedValue={orderBy}
          onValueChange={(itemValue, _itemIndex) => setOrderBy(itemValue)}
          prompt="Order repositories by"
        >
          <Picker.Item label="Latest review" value="CREATED_AT" />
          <Picker.Item label="Average rating" value="RATING_AVERAGE" />
        </Picker>
        <Picker
          selectedValue={orderDirection}
          onValueChange={(itemValue, _itemIndex) =>
            setOrderDirection(itemValue)
          }
        >
          <Picker.Item label="Descending" value="DESC" />
          <Picker.Item label="Ascending" value="ASC" />
        </Picker>
      </>
    );
  };

  return (
    <RepositoryListContainer repositories={repositories} header={listHeader} />
  );
};

export const RepositoryListContainer = ({ repositories, header }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      testID="repositoryList"
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={header}
      renderItem={({ item, _index, _separators }) => {
        return (
          <>
            <Pressable onPress={() => navigate(`/repositories/${item.id}`)}>
              <RepositoryItem key={item.id} item={item} />
            </Pressable>
          </>
        );
      }}
    />
  );
};

export default RepositoryList;
