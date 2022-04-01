<template>
    <!-- <div v-for="potionType in potionTypes">
        <h2>Potions de {{ potionType.name }} :</h2>
        <div v-for="recipe in recipes">
            <p v-if="recipe.type == potionType.id">
                Valeur moyenne : | {{ recipe.averageValue }} |
                Ingrédients :
                <span
                    v-for="ingredientId in recipe.ingredientsList"
                >
                    <span v-for="ingredient in ingredients">
                        <span v-if="ingredient.id == ingredientId">{{ ingredient.name }} |</span>
                    </span>
                </span>
            </p>
            <button
                :id="`hideButton${recipe.id}`"
                type="button"
                @click="togglePotions(recipe.id)"
            >
            <span v-if="!isExpanded(recipe.id)">Voir les potions</span>
            <span v-else>Masquer les potions</span>
            </button>
            <div v-if="isExpanded(recipe.id)">
                <div v-for="potion in potions">
                    <p
                        :id="`showPotion${recipe.id}`"
                        v-if="recipe.potions.includes(`/api/potions/${potion.id}`)"
                    >
                        créateur : {{ potion.customer.username }},
                        niveau : {{ potion.customer.alchemistLevel }},
                        outil : {{ potion.customer.alchemistTool.name }},
                        valeur: {{ potion.value }}
                        id: {{ potion.id }}
                    </p>
                </div>
            </div>
        </div>
    </div>-->
    <div v-for="(recipes, index) in formatedRecipes">
        <h2>{{ index }}</h2>
        <ul v-if="recipes.length">
            <li class="card" v-for="recipe in recipes">
                <p>
                    Ingrédients :
                    <span v-for="ingredient in recipe.ingredients">{{ ingredient.name }} |</span>
                </p>
                <p>Valeur moyenne : {{ recipe.averageValue }}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import store from "../../store";
export default {
    data() {
        return {
            currentIngredients: '',
            recipesExpanded: [],
        };
    },
    props: ['formatedRecipes'],
    mounted() {
        store.dispatch('getPotions');
    },
    computed: {
        potions() {
            return store.getters.getPotions;
        },
    },
    methods: {
        isExpanded(value) {
            return this.recipesExpanded.includes(value);
        },
        togglePotions(id) {
            if (this.recipesExpanded.includes(id)) {
                this.recipesExpanded = this.recipesExpanded.filter((item) => item !== id);
            } else {
                this.recipesExpanded.push(id);
            }
        },

    }
}
</script>

<style scoped>
ul {
    padding: 0;
}

li:not(:first-child) {
    margin-top: 10px;
}
</style>
