const dictionary = {
    pt: {
        messages: {
            required: (field) => `${field} é obrigatório.`,
            min: (field,size) => `${field} deve ter, pelo menos,  ${size} caracteres.`,
            max: (field,size) => `${field} deve ter, no máximo,  ${size} caracteres.`,
            between: (field, params) => `${field} deve estar entre ${params[0]} e ${params[1]}`,
            included: (field) => `Necessário selecionar uma opção no campo ${field}` 
        }
    }
}
export default dictionary