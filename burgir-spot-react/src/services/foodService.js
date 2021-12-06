const url = 'http://localhost:5000/api/burgir'

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