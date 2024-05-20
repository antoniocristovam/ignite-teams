import React from "react";
import { Groups } from "@screens/groups";
import { Players } from "@screens/players";
import { NewGroup } from "@screens/newGroup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="groups" component={Groups} />
      <Screen name="newGroups" component={NewGroup} />
      <Screen name="players" component={Players} />
    </Navigator>
  );
}
