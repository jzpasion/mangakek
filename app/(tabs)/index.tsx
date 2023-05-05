import {
  StyleSheet,
  Button,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
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
              >
                <View style={styles.content}>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    style={styles.contentText}
                  >
                    {item.title}
                  </Text>
                </View>
              </ImageBackground>
              {/* <View style={styles.content}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.contentText}
                >
                  {item.title}
                </Text>
              </View> */}
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
const hexToRgbA = (hex: string, opacity: number) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join("")}`;
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
      ","
    )},${opacity})`;
  }
  throw new Error("Bad Hex");
};

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
    position: "relative",
  },
  itemStyle: {
    width: responsiveWidth(118),
    height: responsiveHeight(200),
    padding: 1,
    backgroundColor: "green",
    borderRadius: 8,
    margin: "2%",
    overflow: "hidden",
  },
  imgContent: {
    flex: 5,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  content: {
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    flexDirection: "row",
    padding: "2%",
    width: "100%",
    backgroundColor: hexToRgbA("#000000", 0.5),
  },
  scrollView: { flex: 1 },
  contentText: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#fff",
  },
});
