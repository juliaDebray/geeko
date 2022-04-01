// Définit l'url de la requête
function setRequestUrl(url, id) {
    const urltest = id ? `${url}/${id}` : url;
    return urltest;
}

// Définit les paramètres de la requête
function setRequestParameters(method, token, payload) {
    return {
        headers: {
            Authorization: token ? `bearer ${token}` : '',
            'Content-Type': method === 'PATCH' ? 'application/merge-patch+json' : 'application/json',
        },
        method,
        body: JSON.stringify(payload),
    }
}

// Vérifie le token
function tokenChecker(token) {
    if (!token) {
        // TODO implémenter le lancement d'une popup en cas d'erreur
        throw new Error('Vous n\'êtes pas connecté');
    }
}

// Récupère une collection
export async function getCollection(url) {
    const request = await fetch(setRequestUrl(url), setRequestParameters('GET'));

    if (request.status !== 200) {
        return [];
    }

    const response = await request.json();

    const data = response['hydra:member'];

    return data;
}

// Récupère une entité
export async function getItem(url, id) {
    const request = await fetch(setRequestUrl(url, id), setRequestParameters('GET'));

    if (request.status !== 200) {
        return [];
    }

    const response = await request.json();

    return response;
}

// Se connecter à l'API
export async function auth(url, payload) {
    const request = await fetch(setRequestUrl(url), setRequestParameters('POST', null, payload));

    if (!request.ok) {
        return null;
    }

    const response = await request.json();

    return response;
}

// Créer un item
export async function postItem(url, token, payload) {
    tokenChecker(token);

    const request = await fetch(setRequestUrl(url), setRequestParameters('POST', token, payload));

    if (!request.ok) {
        return null;
    }

    const response = await request.json();

    return response;
}

// Modifie un item
export async function patchItem(url, token, payload, id) {
    tokenChecker(token);

    const request = await fetch(setRequestUrl(url, id), setRequestParameters('PATCH', token, payload));

    if (!request.ok) {
        return null;
    }

    const response = await request.json();
}

// Supprime un item
export async function deleteItem(url, id, token) {
    tokenChecker(token);

    const request = await fetch(setRequestUrl(url, id), setRequestParameters('DELETE', token));

    return request.ok;
}
