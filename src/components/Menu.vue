<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/potions/new">Créer une potion</RouterLink>
        <RouterLink to="/search">Chercher une potion</RouterLink>
        <RouterLink to="/ingredients">Liste des ingredients</RouterLink>
        <RouterLink to="/recipes">Liste des recettes</RouterLink>
        <button v-if="!token" @click="login('admin')">Admin</button>
        <button v-if="!token" @click="login()">Customer</button>
    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<script>
import { auth } from '../utilities/apiCalls';

export default {
    computed: {
        token() {
            return this.$store.getters.getToken;
        },
    },
    methods: {
        async login(status) {
            const data = {
                password: 'Pa$$w0rd',
            };

            if (status === 'admin') {
                data.email = 'admin';
            } else {
                data.email = 'Customer';
            }

            const response = await auth('http://localhost:8080/api/login_check', data);
            this.$store.commit('setToken', response.token);
        }
    },
}
</script>
