<script>
import store from "../store";

export default {
  data() {
    return {
      id: this.$route.params.id,
      ingredient: {},
      loading: true,
    };
  },
  created() {
    if (!this.$store.getters.getIngredients.length) {
      this.$store.dispatch('getIngredients').then(() => {
        this.getCurrentItem();
      });
    } else {
      this.getCurrentItem();
    }

    if (!this.$store.getters.getIngredientTypes.length) {
      this.$store.dispatch('getIngredientTypes');
    }
  },
  computed: {
    ingredients() {
      return this.$store.getters.getIngredients;
    },
    ingredientTypes() {
      return this.$store.getters.getIngredientTypes;
    }
  },
  methods: {
    getCurrentItem() {
      this.ingredient = this.ingredients.find(element => element.id == this.id);
      this.loading = false;
    },
    updateIngredient() {
      const data = {
        name: this.ingredient.name,
        type: this.ingredient.type,
      };

      store.dispatch('updateIngredient', { data, id: this.id });
    },
  },
}
</script>
<template>
  <div class="title" v-if="!loading">
    <h1>Modifier l'ingrédient : {{ ingredient.name }}</h1>

    <form @submit.prevent="updateIngredient">
      <!-- apparait si l'utilisateur connecté est admin -->
      <div>
        <label for="name">Nom</label>
        <input id="name" type="text" v-model="ingredient.name" />
      </div>
      <div>
        <label for="type">Type</label>
        <select id="type" name="type" v-model="ingredient.type">
          <option>Choisissez un type</option>
          <option
            v-for="ingredientType in ingredientTypes"
            :key="ingredientType.id"
            :value="ingredientType['@id']"
          >{{ ingredientType.name }}</option>
        </select>
      </div>
      <button type="submit">Valider les modifications</button>
    </form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .title {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
