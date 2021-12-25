export const inputErr = (name) => {
    return (<p style={{ 'color': 'red' }}>Please write your {name}</p>)
}

export const inputBorderStyle = {
    normal: { 'border': '1px solid rgb(71, 71, 71)' },
    hover: { 'border': '1px solid #bd7100' },
    error: { 'border': '1px solid red' }
}