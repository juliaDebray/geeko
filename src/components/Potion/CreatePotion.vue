<template>
    <h1>Créer une Potion</h1>

    <PotionSummary
        :potionIngredients="potionIngredients"
        :potionValue="potionValue"
        :potionType="potionType"
    ></PotionSummary>

    <h2>Créer une potion :</h2>
    <form @submit.prevent="createPotion">
        <PotionTypeField
            :potionTypes="potionTypes"
            :updatePotionType="updatePotionType"
        ></PotionTypeField>
        <PotionValueField
            :potionValue="potionValue"
            :updatePotionValue="updatePotionValue"
        ></PotionValueField>
        <PotionIngredientsField
            :ingredients="ingredients"
            :potionIngredients="potionIngredients"
        ></PotionIngredientsField>
        <button type="submit">Créer la potion</button>
    </form>
</template>
<script>
import store from "../../store";
import PotionSummary from "./PotionSummary.vue";
import PotionTypeField from "../forms/PotionTypeField.vue"
import PotionIngredientsField from "../forms/PotionIngredientsField.vue";
import PotionValueField from "../forms/PotionValueField.vue";

export default {
    name: 'CreatePotion',
    components: {
    PotionSummary,
    PotionTypeField,
    PotionIngredientsField,
    PotionValueField
},
    data() {
        return {
            potionType: {},
            potionValue: '',
            potionIngredients: [],
        };
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
        },
    },
    methods: {
        createPotion() {
            const ingredientsList = this.potionIngredients.map((ingredient) => ingredient.id);

            const data = {
                value: this.potionValue.toString(),
                type: this.potionType['@id'],
                ingredientsList,
            };
            store.dispatch('postPotion', data);
        },
        updatePotionValue(value) {
            this.potionValue = value;
        },
        updatePotionType(value) {
            this.potionType = value;
        },
    },
}
</script>

<style>
ul {
    margin: 0;
    padding: 0;
}
</style>
