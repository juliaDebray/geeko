<template>
    <div>
        <label for="identifiant">identifiant</label>
        <input id="identifiant" name="identifiant" type="text" v-model="identifiant"/>
    </div>
    <div>
        <label for="password">mot de passe</label>
        <input id="password" name="password" type="text" v-model="password"/>
    </div>
    <button @click="login">Me connecter</button>
</template>
<script>
    export default {
        data() {
            return {
                identifiant: '',
                password: '',
            }
        },
        methods: {
            async login() {
                const request = await fetch('http://localhost:8080/api/login_check', {
                    method: 'POST',
                    body: JSON.stringify({
                        'email': this.identifiant,
                        'password': this.password,
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })

                if(request.status === 200) {
                    const response = await request.json();
                    this.$store.commit('setToken', response.token);
                }
            }
        },
    }
</script>
<style></style>
