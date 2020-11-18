<template>
  <v-app>
        <Navi></Navi>
    <!-- <Navi></Navi> -->
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="#DADFFF" dark>
      <v-spacer/>2020 copyright by soyoung
    </v-footer>
  </v-app>
</template>

<script>
import Navi from './components/Navi.vue';

export default {
  name: 'App',
  components: {
    Navi
  }
}
</script>