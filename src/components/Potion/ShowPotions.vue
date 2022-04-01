<template>
    <h1>Liste des potions déjà créées : </h1>
    <ul class="card-container">
        <li
            class="card"
            v-for="potion in potions"
        >id: {{ potion.id }}
        |Type de potion : {{ potion.type.name }}
        | valeur : {{ potion.value }}
        | outil : {{ potion.customer.alchemistTool.name}}
        </li>
    </ul>
</template>
<script>
import store from "../../store";
export default {
    name: 'ShowPotions',
    data() {
        return {
        }
    },
    mounted() {
        store.dispatch('getPotions');
    },
    computed: {
        potions() {
            return store.getters.getPotions;
        },
    },
    methods: {
    }
}
</script>

<style>
ul {
    margin: 0;
    padding: 0;
}
.card-container {
    display: flex;
    gap: 20px;
    margin: 50px auto;
    list-style: none;
    flex-wrap: wrap;
}
.card {
    background-color: #fefefe;
    padding: 5px;
    color: #222;
}
</style>
