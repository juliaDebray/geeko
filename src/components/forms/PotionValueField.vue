<template>
    <div>
        <label for="value">Valeur</label>
        <input id="value" name="value" type="number" v-model.number="localPotionValue" @input="updatePotionValue(localPotionValue)"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            localPotionValue: '',
        };
    },
    props: ['potionValue', 'updatePotionValue'],
}
</script>

<style></style>
