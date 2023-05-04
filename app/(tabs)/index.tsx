import { StyleSheet, Button, ScrollView, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
const baseUrl = "https://api.mangadex.org/";

export default function TabOneScreen() {
  const [getMangaItems, setMangaItems] = useState();
  const [getTitles, setTiles] = useState([]);
  const [getCoverArt, setCoverArt] = useState("");
  const [testData, setTestData] = useState([]);

  const test = () => {
    getCover();
    // console.log(getTitles);
  };

  const getData = async () => {
    axios({
      method: "get",
      url: `${baseUrl}/manga?limit=30`,
    }).then((response) => {
      setMangaItems(response.data.data);
      setTiles(response.data.data);
    });
  };

  const getCover = async () => {
    var newData: any = [];
    getTitles.forEach((item: any) => {
      var cover_art = item.relationships.find(
        (rel: any) => rel.type === "cover_art"
      );
      axios.get(`${baseUrl}/cover/${cover_art.id}`).then((data) => {
        newData.push({
          ...item,
          uri: `https://uploads.mangadex.org/covers/${item.id}/${data.data.data.attributes.fileName}.256.jpg`,
        });
      });
    });
    console.log(newData);

    setTiles(newData);
  };

  useEffect(() => {
    getData();
    getCover();
  }, []);
  const Items = () => {
    return (
      <View style={styles.itemContainer}>
        {getTitles.map((item, key) => {
          return (
            <View key={key} style={styles.item}>
              <ImageBackground
                source={item.uri}
                resizeMode="cover"
                style={styles.img_content}
              ></ImageBackground>
              <View style={styles.content}></View>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Button
          onPress={test}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Items></Items>
        {/* {getTitles.map((item, key) => {
        return <Text key={key}>{item.attributes.title.en}</Text>;
      })} */}
        {/* <FlatList
        data={getMangaItems}
        style={styles.container}
        renderItem={({ item }) => (
          <Text style={styles.title}>{item.attributes.title.en}</Text>
        )}
        keyExtractor={(item) => item.id}
        numColumns={10}
      /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemContainer: {
    width: "100%",
    height: "85%",
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "orange",
  },
  item: {
    width: "29%",
    height: "100%",
    padding: 1,
    backgroundColor: "green",
    borderRadius: 15,
    margin: "2%",
  },
  img_content: {
    flex: 5,
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  content: {
    flex: 1,
    backgroundColor: "blue",
    flexWrap: "wrap",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  scrollView: {
    marginHorizontal: 20,
    backgroundColor: "red",
  },
});
