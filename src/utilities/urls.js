const base = 'http://localhost:8080/api';

const urls = {
    base,
    ingredients: base + '/ingredients',
    ingredientTypes: base + '/ingredient_types',
    potions: base + '/potions',
    potionTypes: base + '/potion_types',
    recipes: base + '/recipes',
    admins: base + '/administrators',
    customers: base + '/customers',
    tools: base + '/tools',
    login: base + '/login_check',
}

export default urls;
