<template>
    <div v-for="potionType in potionTypes">
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
    mounted() {
        store.dispatch('getRecipes');
        store.dispatch('getPotionTypes');
        store.dispatch('getPotions');
        store.dispatch('getIngredients');
    },
    computed: {
        potionTypes() {
            return store.getters.getPotionTypes;
        },
        potions() {
            return store.getters.getPotions;
        },
        recipes() {
            return store.getters.getRecipes;
        },
        ingredients() {
            return store.getters.getIngredients;
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
        }
    }
}
</script>

<style>
</style>
