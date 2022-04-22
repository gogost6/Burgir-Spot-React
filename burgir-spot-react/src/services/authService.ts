import { EditPasswordData, EditProfileData, LoginData, RegisterData } from "../interfaces/user";

let baseUrl = '/api/user';

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

export const fullUserDataByUsername = async (username: string) => { 
    const response = await fetch(`${baseUrl}/full-user-data-by-username` , { 
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({username})
    });

    const result = await response.json();

    if (!response.ok) {
        throw result;
    } else {
        return result;
    }
}

export const registerUser = async (data: RegisterData) => {
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

export const loginUser = async (data: LoginData) => {
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

export const editHandled = async (data: EditProfileData) => {
    const response = await fetch(`${baseUrl}/edit`, {
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

export const editPasswordHandled = async (data: EditPasswordData) => {
    const response = await fetch(`${baseUrl}/edit-password`, {
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

export const usedUsername = async (username: string) => {
    const response = await fetch(`${baseUrl}/free-username/${username}`, {
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

export const usedEmail = async (email: string) => {
    const response = await fetch(`${baseUrl}/free-email/${email}`, {
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