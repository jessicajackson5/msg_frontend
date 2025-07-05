import ENVIRONMENT from "../constants/environment"
import methods_HTTP from "../constants/methodsHTTP"

export const login = async ({ email, password }) => {
    try {
        const server_response_http = await fetch(
            `${ENVIRONMENT.URL_API}/api/users/login`,
            {
                method: methods_HTTP.POST,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: email,
                        password: password
                    }
                )
            }
        )
        const server_response_data = await server_response_http.json()
        return server_response_data
    }
    catch(error){
        console.error(error)
        throw {
            message: 'An error ocurred communicating with the server. Try again later' 
        }
    }
}

export const register = async ({ email, password, name }) => {
    try {
        const server_response_http = await fetch(
            `${ENVIRONMENT.URL_API}/api/users/register`,
            {
                method: methods_HTTP.POST,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        name: name,
                        email: email,
                        password: password
                    }
                )
            }
        )
        console.log(name, email, password)
        const server_response_data = await server_response_http.json()
        return server_response_data
    }
    catch(error){
        console.error(error)
        throw {
            message: 'An error ocurred communicating with the server. Try again later' 
        }
    }
}

export const logout = () => {
    try {
        localStorage.removeItem('authorization_token')
        return { ok: true, message: 'Logged out successfully' }
    } catch (error) {
        console.error('Error during logout:', error)
        throw {
            message: 'An error occurred during logout. Please try again.'
        }
    }
}
