import { createStore } from 'vuex';
import urls from '../utilities/urls';
import { getCollection, deleteItem, postItem, getItem, patchItem } from '../utilities/apiCalls';

// Create a new store instance.
export default createStore({
    state: {
        token: '',
        ingredients: [],
        ingredientTypes: [],
        potions: [],
        potionTypes: [],
        recipes: [],
    },
    getters: {
        getToken(state) {
            return state.token;
        },
        getIngredients(state) {
            return state.ingredients;
        },
        getIngredientTypes(state) {
            return state.ingredientTypes;
        },
        getPotions(state) {
            return state.potions;
        },
        getPotionTypes(state) {
            return state.potionTypes;
        },
        getRecipes(state) {
            return state.recipes;
        }
    },
    mutations: {
        setToken(state, data) {
            state.token = data;
        },
        setIngredients(state, data) {
            state.ingredients = data;
        },
        setIngredient(state, data) {
            state.ingredients.push(data);
        },
        setIngredientTypes(state, data) {
            state.ingredientTypes = data;
        },
        addIngredient(state, data) {
            state.ingredients.push(data);
        },
        addPotion(state,data) {
            state.potions.push(data);
        },
        setPotions(state, data) {
            state.potions = data;
        },
        setPotionTypes(state, data) {
            state.potionTypes = data;
        },
        setRecipes(state, data) {
            state.recipes = data;
        }
    },
    actions: {
        // Ajoute un ingrédients
        async postIngredient(context, data) {
            const token = context.getters.getToken;

            const response = await postItem(urls.ingredients, token, data);

            if (response) {
                context.commit('addIngredient', response);
            }
        },

        // Ajoute une potion
        async postPotion(context, data) {
            const token = context.getters.getToken;

            const response = await postItem(urls.potions, token, data);

            if (response) {
                context.commit('addPotion', response);
            }
        },

        // Met à jour un ingrédient
        async updateIngredient(context, payload) {
            const token = context.getters.getToken;

            const response = await patchItem(urls.ingredients, token, payload.data, payload.id);
        },

        // Récupère un ingrédient
        async getIngredient(context, id) {
            const data = await getItem(urls.ingredients, id);

            context.commit('setIngredient', data);
        },

        // Récupère tous les ingrédients
        async getIngredients(context) {
            const data = await getCollection(urls.ingredients);

            context.commit('setIngredients', data);
        },

        // Récupère tous les types d'ingrédient
        async getIngredientTypes(context) {
            const data = await getCollection(urls.ingredientTypes);

            context.commit('setIngredientTypes', data);
        },

        // Supprime un ingrédient
        async deleteIngredient(context, id) {
            const token = context.state.token;

            if (!token) {
                throw new Error('Vous n\'êtes pas connecté');
            }

            const response = await deleteItem(urls.ingredients, id, token)

            if (response) {
                const data = context.getters.getIngredients.filter((item) => {
                    return item.id !== id;
                });

                context.commit('setIngredients', data);
            } else {
                throw new Error('La requête à échouée');
            }
        },

        // Récupère toutes les potions
        async getPotions(context) {
            const data = await getCollection(urls.potions);

            context.commit('setPotions', data);
        },

        // Récupère toutes les recettes
        async getRecipes(context) {
            const data = await getCollection(urls.recipes);

            context.commit('setRecipes', data);
        },

        async getPotionTypes(context) {
            const data = await getCollection(urls.potionTypes);

            context.commit('setPotionTypes', data);
        }
    },
    modules: {},
})

// Install the store instance as a plugin
