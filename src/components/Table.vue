<template>
  <div id="app">
    <v-app>
      <template>
        <v-data-table
          :headers="headers"
          :items="meals_temp"
          :items-per-page="3"
          class="elevation-1"
        >
          <!-- <template v-slot:[`item.id`]="{item}"> -->
            <template v-slot:[`item.counter`]="{item}">
            <!-- <router-link :to="'/Carrousel/' + item.counter"> -->
            <router-link :to="{ path: 'Carrousel', query: { meal: item.counter - 1 }}">
            <!-- <router-link :to="`/Carrousel/`"> -->
              Posiłek: {{ item.counter }}
            </router-link>
          </template>
        </v-data-table>
      </template></v-app
    >
  </div>
</template>

        </v-data-table>
      </template></v-app
    >
  </div>
</template>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    axios.get("https://diet-backend-poland.herokuapp.com/meals/").then((response) => {
      if (response.status == 200) {
        this.fillData(response);
        // console.log(response.data);
      } else {
        console.log("brak danych");
      }
    });
  },

  data: () => ({
    headers: [
      {
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "", value: "counter" },
    ],
    meals: [],
    meals_temp: [],
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

      for (var day = 1; day <= this.days; day++) {
        this.meals.push(response.data.filter((data) => data.day === day));
      }
      
      for (var day = 1; day <= this.days; day++) {
        this.headers.push({
          text: "Dzień ".concat(day),
          value: "title".concat(day),
        });
        // console.log(this.headers);
        const meals_temp1 = this.meals[day - 1].map((item) => {
          const container = {};

          container["counter"] = item.counter;
          container["title".concat(day)] = item.title;

          return container;
        });
        const mealsLength = meals_temp1.length;
        if (day === 1) this.meals_temp = this.meals_temp.concat(meals_temp1);
        else
          for (var counter = 0; counter <= mealsLength - 1; counter++)
            this.meals_temp[counter]["title".concat(day)] =
              meals_temp1[counter]["title".concat(day)];
        
      }
      // console.log(this.meals_temp[0]);
      
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
