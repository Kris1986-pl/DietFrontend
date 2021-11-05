<template>
  <v-app> 
    <v-main>
      <v-container class="grey lighten-5">
        
            <Menu/>
           <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import Menu from './components/main/Menu';
export default {
  name: 'App',
  components: {
      Menu,
  },
}
</script>


