import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

type PropsType = {
  navigation: any
}

function DashboardScreen({ navigation }: PropsType) {
  function navigateToAlbumSelection() {
    navigation.navigate("AlbumSelection" as never);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
        }}
        >
        Welcome to Photo Frame
        </Text>

        <Button title="Select Album" onPress={navigateToAlbumSelection} />
    </View>
  );
};

export default DashboardScreen;