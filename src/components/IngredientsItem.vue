<template>
    <h1>Liste des ingrédients disponibles</h1>
    <form v-if="token" @submit.prevent="addIngredient">
        <!-- apparait si l'utilisateur connecté est admin -->
        <IngredientNameField
            :updateIngredientName="onIngredientNameChange"
        />
        <IngredientTypeField
            v-if="ingredientTypes.length"
            :ingredientTypes="ingredientTypes"
            :updateIngredientType="onIngredientTypeChange"
        />
        <button type="submit">Ajouter un ingrédient</button>
    </form>

    <!-- sinon affiche un message de demande de connection -->
    <div v-else>Pour ajouter un ingrédient, veuillez vous connecter en administrateur</div>

    <!-- affiche chaque ingrédient récupéré par la requête lancée au montage du composant -->
    <ul class="card-container">
        <li class="card" v-for="ingredient in ingredients">
            <ul>
                <li>Nom : {{ ingredient.name }}</li>
                <li>Type : {{ ingredient.type.name }}</li>
                <!-- si l'utilisateur est admin, affiche un bouton de suppression-->
                <li v-if="token">
                    <button
                        class="delete"
                        type="button"
                        @click="deleteIngredient(ingredient.id)"
                    >Supprimer l'ingredient</button>
                </li>
                <li>
                    <router-link
                        class="delete"
                        :to="`/ingredients/${ingredient.id}`"
                    >Modifier l'ingredient</router-link>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
import store from "../store";
import IngredientTypeField from "./forms/IngredientTypeField.vue";
import IngredientNameField from "./forms/IngredientNameField.vue";

export default {
    components: {
        IngredientTypeField,
        IngredientNameField
    },
    data() {
        return {
            ingredientName: '',
            ingredientType: '',
            ingredientId: '',
        }
    },
    computed: {
        token() {
            return this.$store.getters.getToken;
        },
        ingredients() {
            return store.getters.getIngredients;
        },
        ingredientTypes() {
            return store.getters.getIngredientTypes;
        }
    },
    mounted() {
        // Récupère tous les ingrédients
        store.dispatch('getIngredients');
        // Récupère tous les types d'ingrédient
        if (this.token) {
            store.dispatch('getIngredientTypes');
        }
    },
    methods: {
        // Ajoute un ingrédient
        async addIngredient() {
            if (!this.ingredientName || !this.ingredientType) {
                return;
            }

            const data = {
                name: this.ingredientName,
                image: 'TOTO', // TODO changer ça pour récupérer une vraie image
                type: this.ingredientType,
            };

            store.dispatch('postIngredient', data);

            this.ingredientName = '';
            this.ingredientType = '';
        },

        setIngredientId(id) {
            this.ingredientId = id;
        },

        // Supprime un ingrédient
        deleteIngredient(id) {
            store.dispatch('deleteIngredient', id);
        },
        onIngredientNameChange(value) {
            this.ingredientName = value;
        },
        onIngredientTypeChange(value) {
            this.ingredientType = value;
        },
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

.delete {
    background-color: rgba(255, 69, 0, 0.7);
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    padding: 5px 10px;
}

.delete:hover {
    background-color: rgb(255, 69, 0);
}
</style>
