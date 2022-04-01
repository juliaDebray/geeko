<template>
    <div>
        <label for="name">Nom</label>
        <input id="name" type="text" v-model="ingredientName" @input="updateIngredientName(ingredientName)" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            ingredientName: '',
        };
    },
    props: ['ingredientName', 'updateIngredientName'],
}
</script>

<style></style>
