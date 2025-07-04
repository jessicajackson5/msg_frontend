import ENVIRONMENT from "../constants/environment";
import LOCALSTORAGE_KEYS from "../constants/localstorage";
import methods_HTTP from "../constants/methodsHTTP";

export const getAllWorkspaces = async () => {

    try{
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.URL_API + '/api/workspaces', {
            method: methods_HTTP.GET,
            headers: {
                'Authorization': `Bearer ${auth_token}`
            },
        })
        const data = await server_response.json()
        console.log("DATAAAAAAAQAAAAAAA", data)
        return data
    }
    catch(error){
        console.error(error)
        throw error
    }
}

export const createWorkspace = async (workspace) => {

    const {name, description} = workspace
    try{
        const auth_token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTHORIZATION_TOKEN)
        const server_response = await fetch(ENVIRONMENT.URL_API + '/api/workspaces', {
            method: methods_HTTP.POST,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth_token}`
            },
            body: JSON.stringify(
                {
                    name: name,
                    description: description
                }
            )
        })
        const data = await server_response.json()
        console.log("NEW DATAA:", data)
        return data
    }
    catch(error){
        console.error(error)
        throw error
    }
}