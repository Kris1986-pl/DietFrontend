<template>
  <div id="app">
    <v-app>
      <v-row align="center" justify="center" dense>
        <v-col
          cols="12"
          lg="6"
          md="6"
          class="
            grey
            lighten-4
            fill-height
            d-flex
            flex-column
            justify-right
            align-center
          "
        >
          <v-carousel v-model="model" height="auto">
            <v-carousel-item v-for="day in days" v-bind:key="day">
              <v-row class="fill-height" align="center" justify="center">
                <v-card class="justify-center" max-width="600">
                  <v-card-title>Dzień {{ day }}</v-card-title>
                  <div
                    v-for="meal in meals[day - 1]"
                    v-bind:key="meal.counter"
                  >
                    <v-card-actions>
                      <v-card-text>
                        <div id="app">
                          Posiłek {{ meal.counter }} -
                          {{ meal.kcal }}
                          kcal (b/t/w:
                          {{ meal.protein }}/ {{ meal.fat }}/
                          {{ meal.carbohydrates }}) <br />
                          {{ meal.title }}
                        </div>
                      </v-card-text>
                      <v-btn icon @click="$set(show, meal.id, !show[meal.id])">
                        <v-icon>{{
                          show[meal.id] ? "mdi-chevron-up" : "mdi-chevron-down"
                        }}</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <div v-show="show[meal.id]">
                      <v-divider></v-divider>
                      <v-card-text>
                        <div class = "mealDescripion">
                        <li
                          v-for="ingredient in meal.igredientmeals"
                          v-bind:key="ingredient.id"
                        >
                          {{ ingredient.quantity }}
                          {{ ingredient.unit.name }}
                          {{ ingredient.ingredient.name }}
                        </li>
                        <li
                          v-for="ingredient in meal.spice"
                          v-bind:key="ingredient.id"
                        >
                          {{ ingredient.name }}
                        </li>
                        {{ meal.description }}
                        </div>
                      </v-card-text>
                    </div>
                  </div>
                  <br /><br /><br />
                </v-card>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    axios.get("http://127.0.0.1:8000/meals/").then((response) => {
      if (response.status == 200) {
        this.fillData(response);
        console.log(response.data);
      } else {
        console.log("brak danych");
      }
    });
  },

  data: () => ({
    meals: [],
    show: [],
    model: 0,
    days: 0,
  }),
  methods: {
    fillData(response) {
      this.days = Math.max.apply(
        Math,
        response.data.map((data) => data.day)
      );

      for (var i = 1; i <= this.days; i++) {
        this.meals.push(response.data.filter((data) => data.day === i));
      }
      for (var i = 1; i <= 3; i++) {
        this.show[i] = false;
      }
    },
  },
};
</script>

<style scoped>
.mealDescripion {
  text-align: justify;
}
</style>
