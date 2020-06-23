<template>
  <nb-container>
    <nb-header :style="{backgroundColor: '#35654d'}">
      <nb-left>
        <nb-button transparent :on-press="() => navigation.navigate('DrawerOpen')">
          <Icon name="bars" color="#fff" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-title>Entregar</nb-title>
      </nb-body>
      <nb-right />
    </nb-header>
    <nb-content padder>
      <nb-list v-if="currentCollector.id">
        <nb-list-item>{{currentCollector.name}}</nb-list-item>
        <nb-list-item>{{currentCollector.email}}</nb-list-item>
      </nb-list>
      <nb-form v-else>
        <nb-item>
          <nb-input v-model="deliveryCode" placeholder="Código de entrega" />
        </nb-item>
        <view :style="{marginTop:10}">
          <nb-button block :style="{backgroundColor: '#35654d'}" :on-press="searchCollector">
            <nb-text :style="{fontWeight: 'bold'}">Confirmar</nb-text>
          </nb-button>
        </view>
      </nb-form>
    </nb-content>
  </nb-container>
</template>

<script>
import { Dimensions, Platform, AsyncStorage } from "react-native";
import { Toast } from "native-base";
import { NavigationActions } from "vue-native-router";
import store from "../store";
import Icon from "react-native-vector-icons/FontAwesome";

export default {
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    currentCollector() {
      return store.state.currentCollector;
    }
  },
  data: function() {
    return {
      deliveryCode: ""
    };
  },
  created() {},
  methods: {
    searchCollector() {
      if (this.currentCollector.id) {
        store.dispatch("DELIVER", {
          id_driver: store.state.userObj.id,
          id_request: store.state.userObj.current_request,
          code: this.deliveryCode
        });
        this.navigator.navigate("Home");
      } else {
        store.dispatch("SEARCH_COLLECTOR", this.deliveryCode);
      }
    }
  },
  components: { Icon }
};
</script>