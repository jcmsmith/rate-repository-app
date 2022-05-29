import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORY, GET_REVIEWS } from "../graphql/queries";
import { Linky } from "./Link";
import {
  LoadingText,
  TextBold,
  Subheading,
  TextPrimary,
  TextSecondary,
} from "./Text";
import RepositoryItem from "./RepositoryItem";
import ItemSeparator from "./ItemSeparator";
import theme from "../theme";

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: theme.colors.backgroundMed,
    flexDirection: "row",
  },
  scoreColumn: {
    marginTop: 10,
    width: 50,
    flex: 1,
  },
  score: {
    alignSelf: "center",
    width: 50,
    height: 50,
    borderColor: theme.colors.emphasis,
    borderWidth: 2,
    borderRadius: 25,
    padding: 8,
  },
  scoreText: {
    alignSelf: "center",
    paddingTop: 5,
  },
  reviewColumn: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "flex-start",
    flex: 5,
  },
  reviewText: {
    marginTop: 2,
    marginBottom: 2,
  },
});

const RepositoryInfo = ({ repo }) => {
  return (
    <>
      <RepositoryItem item={repo} />
      <Linky text="Open repo" url={repo.url} />
    </>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.scoreColumn}>
        <View style={styles.score}>
          <TextBold
            text={parseInt(review.rating)}
            color={theme.colors.emphasis}
            style={styles.scoreText}
          />
        </View>
      </View>

      <View style={styles.reviewColumn}>
        <Subheading text={review.user.username} style={styles.reviewText} />
        <TextSecondary
          text={review.createdAt.substring(0, 10)}
          style={styles.reviewText}
        />
        <TextPrimary text={review.text} style={styles.reviewText} />
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const [repo, setRepo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const param = useParams();

  const repoQuery = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: param.id },
    onError: (error) => {
      console.error("Get repo by id:", error);
    },
    onCompleted: (data) => {
      if (data && data.repository !== null) {
        setRepo(data.repository);
      }
    },
    fetchPolicy: "cache-and-network",
  });

  const reviewsQuery = useQuery(GET_REVIEWS, {
    variables: { repositoryId: param.id },
    onError: (error) => {
      console.error("Get repo reviews:", error);
    },
    onCompleted: (data) => {
      console.log("data", data);
      if (data && data.repository.reviews !== null) {
        const receivedReviews = data.repository.reviews.edges.map(
          (edge) => edge.node
        );

        setReviews(receivedReviews);
      }
    },
    fetchPolicy: "cache-and-network",
  });

  if (repoQuery.loading || reviewsQuery.loading) {
    return <LoadingText />;
  }

  return repo ? (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repo={repo} />}
      ListEmptyComponent={() => <LoadingText text={"No reviews yet!"} />}
      ItemSeparatorComponent={() => <ItemSeparator />}
    />
  ) : null;
};

export default SingleRepository;
