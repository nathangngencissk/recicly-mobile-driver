<template>
  <root>
    <app-navigation></app-navigation>
  </root>
</template>


<script>
import React from "react";
import {
  StackNavigator,
  DrawerNavigator,
  navigationService
} from "vue-native-router";
import { Root } from "native-base";
import LoginScreen from "./screens/login.vue";
import HomeScreen from "./screens/home.vue";
import Sidebar from "./screens/sidebar.vue";
import HistoryScreen from "./screens/history.vue";
import NewUserScreen from "./screens/newUser.vue";
import DeliveryScreen from "./screens/delivery.vue";

const Drawer = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    History: { screen: HistoryScreen },
    NewUser: { screen: NewUserScreen },
    Delivery: { screen: DeliveryScreen }
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <Sidebar {...props} />
  }
);

const AppNavigation = StackNavigator(
  {
    Login: { screen: LoginScreen },
    Drawer: { screen: Drawer },
    History: { screen: HistoryScreen },
    NewUser: { screen: NewUserScreen },
    Delivery: { screen: DeliveryScreen }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);
export default {
  components: { Root, AppNavigation }
};
</script> 