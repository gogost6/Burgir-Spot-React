export const inputErr = (name) => {
    return (<p style={{ 'color': 'red' }}>Please write your {name}!</p>)
}

export const inputLengthErr = (name, num) => {
    return (<p style={{ 'color': 'red' }}>{name} should be atleast {num} chars!</p>)
}

export const usedErr = (name) => {
    return (<p style={{ 'color': 'yellow' }}>{name} is used by other user!</p>)
}

export const inputValidErr = (name) => {
    return (<p style={{ 'color': 'red' }}>{name} should be valid!</p>)
}

export const inputBorderStyle = {
    normal: { 'border': '1px solid rgb(71, 71, 71)' },
    hover: { 'border': '1px solid #bd7100' },
    error: { 'border': '1px solid red' }
}