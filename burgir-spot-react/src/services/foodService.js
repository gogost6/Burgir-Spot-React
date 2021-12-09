const url = 'http://localhost:5000/api/burgir';

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