import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePotionView from '../views/CreatePotionView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/ingredients',
            name: 'ingredients',
            component: () => import('../views/IngredientsView.vue'),
        },
        {
            path: '/potions/new',
            name: 'potions',
            component: CreatePotionView,
        },
        {
            path: '/ingredients/:id',
            name: 'ingredient_edit',
            component: () => import('../views/IngredientView.vue'),
        },
        {
            path: '/recipes',
            name: 'recipes',
            component: () => import('../views/RecipesView.vue'),
        },
        {
            path: '/search',
            name: 'search',
            component: () => import('../views/SearchView.vue'),
        },
    ],
})

export default router
