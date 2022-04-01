<template>
    <h2>Récapitulatif de la potion :</h2>
    <div class="card">
        <p>Type : {{ potionType.name }}</p>
        <p>Valeur : {{ potionValue }}</p>
        <p>
            Ingrédients :
            <button
                v-for="(ingredient, index) in this.potionIngredients"
                @click="deleteIngredient(index)"
            >{{ ingredient.name }}</button>
        </p>
    </div>
</template>
<script>
export default {
    props: ['potionIngredients', 'potionValue', 'potionType'],
    methods: {
        deleteIngredient(index) {
            this.potionIngredients.splice(index, 1);
        }
    },
}
</script>
<style>
    .card {
        background-color: #fefefe;
        padding: 5px;
        color: #222;
    }
</style>
