import { View, Text, ImageBackground, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Audio } from "expo-av";
const HomeScreen = () => {
  const [temp, setTemp] = useState(null);
  useEffect(() => {
    setInterval(() => {
      (async () => {
        axios
          .get(
            "https://api.thingspeak.com/channels/2337257/feeds.json?api_key=ZM1IR52IRI2VJOC3&results=2"
          )
          .then((rs) => {
            setTemp(rs.data.feeds[1].field1);
            if (rs.data.feeds[1].field1 > 36 || rs.data.feeds[1].field1 < 34) {
              (async () => {
                const { sound } = await Audio.Sound.createAsync(
                  require("../assets/warning.mp3")
                );
                await sound.playAsync();
              })();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })();
    }, 1000);
  }, []);
  console.log(temp);
  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      resizeMode="cover"
      style={{ flex: 1, width: "100%", height: "100%", paddingTop: 50 }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: 60,
        }}
      >
        <View>
          <Text
            style={{
              color: "brown",
              fontWeight: "bold",
              marginTop: "30px",
              fontSize: 30,
            }}
          >
            THEO DÕI SỨC KHỎE
          </Text>
        </View>
        <View
          style={{
            marginTop: "30px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/1.png")}
            style={{ width: 200, height: 200 }}
          ></Image>
          <Text
            style={{ fontWeight: "bold", fontSize: 50 }}
          >{`${temp}°C`}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
