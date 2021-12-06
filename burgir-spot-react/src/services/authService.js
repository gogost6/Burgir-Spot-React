let baseUrl = 'http://localhost:5000/api/user';

export const getUser = async () => { 
    const response = await fetch(`${baseUrl}` , { 
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    });

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}

export const registerUser = async (data) => {
    const response = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    
    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}

export const loginUser = async (data) => {
    const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}

export const logoutHandled = async () => {
    const response = await fetch(`${baseUrl}/logout`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include'
    })
    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}