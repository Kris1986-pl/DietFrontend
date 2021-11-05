<template>
  <v-tabs>
    <v-tab
            v-for="item in menuItems"
            :key="item.title"
            router 
            :to="item.link">
            {{item.title}}
    </v-tab>
  </v-tabs>
</template>
<script>
export default {
  data(){
  return {
        sideNave: false,
        menuItems: [
          {title:"Tabela", link:"/Table"},
          {title:"Szczegóły", link:"/Carrousel"},
        ]
        }
  }
}
</script>

            