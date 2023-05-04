import {
  StyleSheet,
  Button,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Text, View } from "../../components/Themed";
import { responsiveHeight, responsiveWidth } from "../utils/utils";
const baseUrl = "http://localhost:3000/mangakek";
let ScreenHeight = Dimensions.get("window").height;
export default function TabOneScreen() {
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState();
  let [getMangaItems, setMangaItems] = useState([]);

  const test = () => {
    getData();
  };

  const getData = async () => {
    fetch(
      `${baseUrl}/manga?limit=90&excludedTags[]=5920b825-4181-4a17-beeb-9918b0ff7a30`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setMangaItems(result.data);
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        }
      );
  };

  const getContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" />;
    }

    if (error) {
      return <Text>{error}</Text>;
    }

    console.log(getMangaItems);
    return (
      <View style={styles.itemContainer}>
        {getMangaItems.map((item, key) => {
          return (
            <View key={key} style={styles.itemStyle}>
              <ImageBackground
                source={item.uri}
                resizeMode="cover"
                style={styles.imgContent}
              ></ImageBackground>
              <View style={styles.content}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={2}
                  style={styles.contentText}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <Button
        onPress={test}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      {getContent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemContainer: {
    flex: 1,
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "red",
    height: ScreenHeight,
  },
  itemStyle: {
    width: responsiveWidth(118),
    height: responsiveHeight(200),
    padding: 1,
    backgroundColor: "green",
    borderRadius: 8,
    margin: "2%",
  },
  imgContent: {
    flex: 5,
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    flexWrap: "wrap",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: "space-evenly",
    flexDirection: "row",
    paddingHorizontal: "2%",
  },
  scrollView: { flex: 1 },
  contentText: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#444",
  },
});
