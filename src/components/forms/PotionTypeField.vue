<template>
    <div>
        <label for="type">Type</label>
        <select id="type" name="type" v-model="potionType" @change="updatePotionType(potionType)">
            <option>Choisissez un type</option>
            <option
                v-for="potionType in potionTypes"
                :key="potionType.id"
                :value="potionType"
            >{{ potionType.name }}</option>
        </select>
    </div>
</template>

<script>
export default {
    data() {
        return {
            potionType: '',
        };
    },
    props: ['potionTypes', 'updatePotionType'],
}
</script>

<style></style>
