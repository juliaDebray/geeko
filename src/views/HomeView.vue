<script>
import LoginForm from '../components/forms/LoginForm.vue';
export default {
    components: {
        LoginForm,
    },
    computed: {
        token() {
            return this.$store.getters.getToken;
        }
    }
}
</script>

<template>
    <main>
        <LoginForm v-if="!token" />
        <div v-else>Vous êtes bien connecté !</div>
    </main>
</template>

