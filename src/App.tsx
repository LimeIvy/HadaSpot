import * as React from "react";
import { useState } from "react";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Compare from "./features/compare/Compare";
import History from "./features/history/History";
import Map from "./features/map/Map";
import Settings from "./features/settings/Settings";

const Tab = createBottomTabNavigator();

const App = () => {
  const [isPremium] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "help-outline";

            if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
            } else if (route.name === "Compare") {
              iconName = focused ? "git-compare" : "git-compare-outline";
            } else if (route.name === "History") {
              iconName = focused ? "time" : "time-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings" : "settings-outline";
            }

            const isPremiumRoute = route.name === "Compare";

            return (
              <View className="relative flex items-center justify-center">
                <Ionicons name={iconName} color={color} size={size} />
                {isPremiumRoute && !isPremium && (
                  <View
                    style={{
                      position: "absolute",
                      top: -4,
                      right: -8,
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: "#EF4444",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 2,
                      borderColor: "#FFFFFF",
                    }}
                  >
                    <Ionicons name="lock-closed" color="#FFFFFF" size={10} />
                  </View>
                )}
              </View>
            );
          },
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#3B82F6",
          tabBarInactiveTintColor: "#9CA3AF",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            marginTop: 4,
          },
          tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 100,
            right: 100,
            borderRadius: 20,
            height: 80,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
            borderTopColor: "transparent",
            elevation: 8,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarIconStyle: {
            marginTop: 0,
          },
        })}
      >
        <Tab.Screen
          name="Map"
          component={Map}
          options={{ tabBarLabel: "マップ" }}
        />
        <Tab.Screen
          name="Compare"
          component={Compare}
          options={{ tabBarLabel: "比較" }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{ tabBarLabel: "履歴" }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ tabBarLabel: "設定" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
