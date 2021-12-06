let baseUrl = 'http://localhost:5000/api/user'

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

export const getUser = () => {
    let userData = localStorage.getItem('user-data');

    return Boolean(userData);
};