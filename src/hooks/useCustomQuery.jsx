import { useState } from "react"
const useCustomQuery = () => {
    const [response,setResponse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error,setError] = useState(null)

    const sendRequest = async(callback) => {
        try {
            setLoading(true)
            const data = await sendRequest(callback)
            setResponse(data)
        }
        catch(error){
            console.error("There was an error in obtaining the workspaces", error)
            setError(error) 
        }
        finally{
            setLoading(false)
        }
    }
    return{
        response,
        loading,
        error,
        sendRequest
    }
}

export default useCustomQuery