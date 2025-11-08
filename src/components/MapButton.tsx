import React from "react";
import { Pressable, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  onPressIcon: () => void;
}

// 地図の右上に表示する用のコンポーネント(FC)
const MapButton: React.FC<Props> = (props) => {
  const { onPressIcon } = props;
  return (
    <View
      style={{
        position: "absolute",
        right: 20,
        bottom: 100,
      }}
    >
      <Pressable onPress={onPressIcon} className="p-2">
        <Ionicons
          name="navigate"
          size={40}
          color="#3B82F6"
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "100%",
            padding: 12,
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
        />
      </Pressable>
    </View>
  );
};

export default MapButton;
