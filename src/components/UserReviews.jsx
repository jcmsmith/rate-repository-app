import { useState } from "react";
import { useQuery } from "@apollo/client";
import { View, StyleSheet, FlatList } from "react-native";

import { GET_CURRENTUSER } from "../graphql/queries";
import { LoadingText, Subheading, TextPrimary } from "./Text";
import { ReviewItem } from "./RepositoryDetails";
import ItemSeparator from "./ItemSeparator";

const styles = StyleSheet.create({
  userInfoContainer: {
    flexDirection: "row",
    margin: 20,
  },
  infoText: {
    margin: 5,
  },
});

const UserInfo = ({ username, reviewCount }) => {
  const singular = reviewCount === 1;
  const countText = singular ? "review" : "reviews";

  return (
    <View style={styles.userInfoContainer}>
      <Subheading text={`Hello, ${username}!`} style={styles.infoText} />
      <TextPrimary
        text={`You currently have ${reviewCount} ${countText}`}
        style={styles.infoText}
      />
    </View>
  );
};

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);

  const variables = { first: 10, includeReviews: true };

  const { data, loading, fetchMore } = useQuery(GET_CURRENTUSER, {
    variables,
    onError: (error) => {
      console.error("Get my reviews", error);
    },
    onCompleted: (data) => {
      if (data.me?.reviews?.totalCount > 0) {
        const returnedReviews = data.me.reviews.edges.map((edge) => edge.node);
        setReviews(returnedReviews);
      }
    },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data.me?.reviews?.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  if (loading) {
    return <LoadingText />;
  }

  if (!data || !data.me) {
    return <LoadingText text="Something went wrong!" />;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem review={item} title={item.repository.name} />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <UserInfo
          username={data.me.username}
          reviewCount={data.me.reviewCount}
        />
      )}
      ListEmptyComponent={() => <LoadingText text={"No reviews yet!"} />}
      ItemSeparatorComponent={() => <ItemSeparator />}
      onEndReached={() => handleFetchMore()}
      onEndReachedThreshold={0.5}
    />
  );
};

export default UserReviews;
