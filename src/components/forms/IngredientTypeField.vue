<template>
    <div>
        <label for="type">Type</label>
        <select id="type" name="type" v-model="ingredientType" @change="updateIngredientType(ingredientType)">
            <option>Choisissez un type</option>
            <option
                v-for="ingredientType in ingredientTypes"
                :key="ingredientType.id"
                :value="ingredientType['@id']"
            >{{ ingredientType.name }}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: ['ingredientTypes', 'updateIngredientType'],
    data() {
        return {
            ingredientType: '',
        };
    },
}
</script>

<style></style>
