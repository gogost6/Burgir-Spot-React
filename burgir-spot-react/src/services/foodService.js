const url = '/api/burgir';

export const recentBurgirs = async () => {
    const responce = await fetch(`${url}/recent-burgirs`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    });    

    const result = await responce.json();
    
    if(!responce.ok) {
        throw result;
    } else {
        return result; 
    }
}

export const burgirDetails =  async (id) => {
    const responce = await fetch(`${url}/details/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    });    

    const result = await responce.json();
    
    if(!responce.ok) {
        throw result;
    } else {
        return result; 
    }
}

export const createBurgir = async (data) => {
    const responce = await fetch(`${url}/create-burgir`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });    

    const result = await responce.json();
    
    if(!responce.ok) {
        throw result;
    } else {
        return result; 
    }
}

export const deleteBurgir = async (id) => {
    const responce = await fetch(`${url}/delete/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    });    

    const result = await responce.json();
    
    if(!responce.ok) {
        throw result;
    } else {
        return result; 
    }
}

export const editBurgir = async (data, id) => {
    const responce = await fetch(`${url}/edit/${id}`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });    

    const result = await responce.json();
    
    if(!responce.ok) {
        throw result;
    } else {
        return result; 
    }
}

export const addToLikedHandler = async (id) => {
    const data = {_id: id};
    const responce = await fetch(`${url}/like`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });    

    const result = await responce.json();
    
    if(!responce.ok) {
        throw result;
    } else {
        return result; 
    }
}

export const removeFromFavouriteHandler = async (id) => {
    const data = {_id: id};
    const responce = await fetch(`${url}/like`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });    

    const result = await responce.json();
    
    if(!responce.ok) {
        throw result;
    } else {
        return result; 
    }
}

export const getOwned =  async (id) => {
    const responce = await fetch(`${url}/owned`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    });    

    const result = await responce.json();
    
    if(!responce.ok) {
        throw result;
    } else {
        return result; 
    }
}

export const getLiked =  async (id) => {
    const responce = await fetch(`${url}/liked-collection`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    });    

    const result = await responce.json();
    
    if(!responce.ok) {
        throw result;
    } else {
        return result; 
    }
}