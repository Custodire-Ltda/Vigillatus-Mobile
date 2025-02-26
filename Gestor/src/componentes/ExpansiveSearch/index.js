import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput } from "react-native";
import Styles from "./styles.js";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

export default function Search({ results, setFilteredResults }) {
  const [pressed, setPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [colorSearch, setColorSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handlePress = () => {
    setIsVisible(!isVisible);
    setPressed(!pressed);
    setColorSearch(!colorSearch);
  };

  useEffect(() => {
    if (searchText === "") {
      setFilteredResults(results);
    } else {
      setFilteredResults(
        results.filter((item) => {
          return (
            item?.setor?.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.data?.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.status?.toLowerCase().includes(searchText.toLowerCase())
          );
        })
      );
    }
  }, [searchText, results]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={pressed ? Styles.containerPressed : Styles.container}
    >
      <View style={Styles.body}>
        {isVisible && (
          <TextInput
            style={Styles.input}
            placeholder="Search"
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
          />
        )}
        <FontAwesome6
          name="magnifying-glass"
          size={32}
          color={colorSearch ? "gray" : "white"}
        />
      </View>
    </TouchableOpacity>
  );
}
