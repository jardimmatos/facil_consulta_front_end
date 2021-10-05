class SessionCadastroStorageService{
    
    static adicionarItem(key, dados){
        sessionStorage.setItem(key, JSON.stringify(dados))
    }

    static obterDados(key){
        const item = sessionStorage.getItem( key )
        return JSON.parse(item)
    }

    static removerItem(key){
        sessionStorage.removeItem(key)
    }
}


export default SessionCadastroStorageService