<template>
    <fieldset class="card-container">
        <legend>Veuillez selectionner vos ingrédients (4 minimum) :</legend>
        <div v-for="ingredient in ingredients">
            <button
                type="button"
                :id="ingredient.id"
                name="ingredient"
                @click="addIngredient(ingredient)"
            >
                {{ ingredient.name }}
            </button>
        </div>
    </fieldset>
<div>

</div>
</template>

<script>
export default {
    props: ['ingredients', 'potionIngredients'],
    methods: {
        addIngredient(ingredient) {
            const data = {
                id: ingredient.id,
                name: ingredient.name,
            };

            if (this.potionIngredients.length === 5) {
                alert("5 ingrédients maximum !")
            } else {
                this.potionIngredients.push(data);
            }
        },
    }
}
</script>

<style>
.card-container {
    display: flex;
    gap: 20px;
    margin: 50px auto;
    list-style: none;
    flex-wrap: wrap;
}
</style>
