<template>
    <h1>Chercher des potions</h1>
    <PotionSummary
        :potionIngredients="potionIngredients"
        :potionValue="potionValue"
        :potionType="potionType"
    ></PotionSummary>
    <h2>Ma Recherche</h2>
    <PotionTypeField :potionTypes="potionTypes" :updatePotionType="updatePotionType"></PotionTypeField>
    <PotionIngredientsField :ingredients="ingredients" :potionIngredients="potionIngredients"></PotionIngredientsField>
    <label for="ingredientOrder">
        <input
            type="checkbox"
            id="ingredientOrder"
            name="ingredientOrder"
            @change="!orderRespected"
            :disabled="disabled"
        />
        Respecter l'odre des ingrédients
    </label>
    <button @click="searchRecipes()" type="submit">Chercher</button>
    <RecipesSearchResult :formatedRecipes="formatedRecipes"></RecipesSearchResult>
</template>
<script>

import store from "../../store";
import { getCollection } from "../../utilities/apiCalls"
import urls from "../../utilities/urls"
import PotionIngredientsField from "../forms/PotionIngredientsField.vue";
import PotionTypeField from "../forms/PotionTypeField.vue";
import PotionSummary from "../Potion/PotionSummary.vue";
import RecipesSearchResult from "../Recipe/RecipesSearchResult.vue";

export default {
    name: 'SearchRecipes',
    components: {
        PotionTypeField,
        PotionSummary,
        PotionIngredientsField,
        RecipesSearchResult,
    },
    data() {
        return {
            potionType: {},
            potionValue: '',
            potionIngredients: [],
            recipes: [],
            formatedRecipes: [],
            orderRespected: false,
            disabled: true,
        }
    },
    mounted() {
        store.dispatch('getPotionTypes');
        store.dispatch('getIngredients');
    },
    computed: {
        potionTypes() {
            return store.getters.getPotionTypes;
        },
        ingredients() {
            return store.getters.getIngredients;
        }
    },
    watch: {
        potionIngredients: {
            handler() {
                this.onPotionIngredientsChange()
            },
            deep: true,
        },
    },
    methods: {
        onPotionIngredientsChange() {
            this.disabled = this.potionIngredients.length < 2;
        },
        updatePotionType(value) {
            this.potionType = value;
        },
        updatePotionValue(value) {
            this.potionValue = value;
        },
        async formatRecipes(recipes) {
            const formated = await recipes.reduce((previous, current) => {
                const potionTypeId = current.type;

                current.ingredientsList.forEach((ingredientId) => {
                    const ingredient = this.ingredients.find((currentIngredient) => {
                        return ingredientId == currentIngredient.id;
                    });

                    // Créer une propriété qui contient les noms des ingrédients
                    if ('ingredients' in current) {
                        current['ingredients'].push(ingredient);
                    } else {
                        current['ingredients'] = [ingredient];
                    }
                })

                const potionType = this.potionTypes.find((type) => type.id == potionTypeId);

                // Rassemble les recettes du même type
                if (potionType.name in previous) {
                    previous[potionType.name].push(current);
                } else {
                    previous[potionType.name] = [current];
                }

                return previous;
            }, {})

            console.log(formated);
            return formated;
        },
        async searchRecipes() {
            const { id } = this.potionType;

            const url = new URL(urls.recipes);

            if (id) {
                url.searchParams.append('type', id);
            }

            if (this.potionIngredients.length && !this.orderRespected) {
                this.potionIngredients.forEach(ingredient => {
                    url.searchParams.append('ingredientsList[]', ingredient.id)
                });
            }

            if (this.potionIngredients.length && this.orderRespected) {
                const ingredients = this.potionIngredients.map((ingredient) => ingredient.id).join(', ');

                url.searchParams.append('ingredientsList', ingredients)
            }

            this.recipes = await getCollection(url.href);

            if (this.recipes.length) {
                this.formatedRecipes = await this.formatRecipes(this.recipes);
            } else {
                alert('pas de recette trouvée');
            }
        }
    }
}
</script>
<style></style>
