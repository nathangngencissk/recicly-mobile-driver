<template>
  <nb-container :style="{flex:1, backgroundColor: '#fff'}">
    <nb-header :style="{backgroundColor: '#35654d'}">
      <nb-left>
        <nb-button transparent :on-press="() => navigation.navigate('DrawerOpen')">
          <Icon name="bars" color="#fff" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Inicio</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content padder>
      <nb-row :style="{flex:1, alignItems: 'center'}">
        <nb-col>
          <image
            v-if="profilePicture"
            :style="{width: 100, height: 100, borderRadius: 50, margin: 25}"
            :source="{uri: profilePicture}"
          />
          <image
            v-else
            :style="{width: 100, height: 100, borderRadius: 50, margin: 25}"
            :source="require('../../assets/user.png')"
          />
        </nb-col>
        <nb-col>
          <text :style="{fontSize: 20, color: '#35654d'}">{{userName}}</text>
          <text :style="{fontSize: 20, fontWeight: 'bold', color: '#35654d'}">{{userPoints}} pts</text>
        </nb-col>
      </nb-row>
      <nb-spinner v-if="fetchingNewRequests" />
      <nb-list v-else>
        <nb-list-item
          v-for="request in newRequests"
          :key="request.request.id"
          :onPress="() => changeRequest(request)"
        >
          <nb-left>
            <nb-text>{{request.user.name}}, {{request.address.street}}, {{request.address.number}}. {{request.address.cep}}</nb-text>
          </nb-left>
          <nb-right>
            <nb-radio :selected="request==selectedRequest" />
          </nb-right>
        </nb-list-item>
      </nb-list>
      <view :style="{marginTop:10}">
        <nb-button block :style="{backgroundColor: '#35654d'}" :on-press="askStartDelivery">
          <nb-text :style="{fontWeight: 'bold'}">Confirmar</nb-text>
        </nb-button>
      </view>
      <view :style="{marginTop:10}">
        <nb-button block :style="{backgroundColor: '#35654d'}" :on-press="goToDelivery">
          <nb-text>Entregar</nb-text>
        </nb-button>
      </view>
    </nb-content>
  </nb-container>
</template>

<script>
import React from "react";
import Item from "../components/item";
import { Dimensions } from "react-native";
import { NavigationActions } from "vue-native-router";
import store from "../store";
import Icon from "react-native-vector-icons/FontAwesome";
import { Alert } from "react-native";
import { Toast } from "native-base";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default {
  computed: {
    items() {
      return store.state.posts;
    },
    loading() {
      return store.state.loadingPosts;
    },
    profilePicture() {
      return store.state.userObj.profile_picture;
    },
    userPoints() {
      return store.state.userObj.points;
    },
    userName() {
      return store.state.userObj.name;
    },
    newRequests() {
      return store.state.newRequests;
    },
    fetchingNewRequests() {
      return store.state.fetchingNewRequests;
    },
    selectedRequest() {
      return store.state.selectedRequest;
    },
    currentRequest() {
      return store.state.userObj.current_request;
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  created() {
    this.fetchNewRequests();
  },
  methods: {
    fetchNewRequests() {
      return store.dispatch("GET_NEW_REQUESTS");
    },
    navigate() {
      this.navigation.navigate("Home");
    },
    startDelivery() {
      store.dispatch("START_DELIVERY", {
        driver_id: store.state.userObj.id,
        request_id: this.selectedRequest.request.id
      });
      Toast.show({
        text: "Entregue o pedido e clique em 'Entregar'",
        buttonText: "Okay"
      });
    },
    changeRequest(request) {
      return store.dispatch("SET_SELECTED_REQUEST", request);
    },
    goToDelivery() {
      if (this.currentRequest != null) {
        this.navigation.navigate("Delivery");
      } else {
        Toast.show({
          text: "Termine a entrega",
          buttonText: "Okay"
        });
      }
    },
    askStartDelivery: function() {
      if (this.selectedRequest.request.id) {
        Alert.alert(
          "Confirme o pedido",
          `${this.selectedRequest.user.name}, ${this.selectedRequest.address.street}, ${this.selectedRequest.address.number}. ${this.selectedRequest.address.cep}`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => this.startDelivery() }
          ],
          { cancelable: false }
        );
      } else {
        Toast.show({
          text: "Selecione um pedido",
          buttonText: "Okay"
        });
      }
    }
  },
  components: {
    Item,
    Icon
  }
};
</script>