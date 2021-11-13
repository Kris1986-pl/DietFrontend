<template>
  <div id="app">
    <v-app>
      <template>
        <v-data-table
          :headers="headers"
          :items="meals_temp"
          :items-per-page="3"
          :sort-by="['day']"
          class="elevation-1"
        >
          <template v-slot:[`item.day`]="{ item }">
            <router-link
              :to="{ path: 'Carrousel', query: { meal: item.day - 1 } }"
            >
              Dzień: {{ item.day }}
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
    axios
      .get("https://diet-backend-poland.herokuapp.com/meals/")
      .then((response) => {
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
      { text: "", value: "day" },
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
        var meal =this.meals;
        var titles = meal[day-1].map((meal) => meal.title);
        var c = meal[day-1].map((meal) => "title".concat(meal.counter));
        var result = titles.reduce(function (result, field, index) {
          result["day"] = day;
          result[c[index]] = field;
          return result;
        }, {});
        console.log(result);
        this.meals_temp[day-1] = result;
      }

      for (var day = 1; day <= this.days; day++) {
        this.headers.push({
          text: "Posiłek ".concat(day),
          value: "title".concat(day),
        });
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
