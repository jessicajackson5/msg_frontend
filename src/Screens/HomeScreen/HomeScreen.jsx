import React from "react";
import { useEffect, useState } from "react";
import "./HomeScreen.css";
import { getAllWorkspaces } from "../../services/workspaceService";


const HomeScreen = () => {
    const [response,setResponse] = useState([])
    const [loading, setLoading] = useState(true)
    const getWorkspaces = async () => {
        try{
            setLoading(true)
            const data = await getAllWorkspaces()
            setResponse(data)
        }
        catch(error){
            console.error("Error al obtener workspaces", error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect (
        () => {
            getWorkspaces()
        }, 
        []
    )
    console.log({loading, response})
    return (
        <div>
            loading
            ? <h2>Cargando...</h2>
            : <div>
                {
                    response.data.workspaces.map(
                        (element) => {
                            return(
                                <div>
                                    <h2>{element.workspace.name}</h2>
                                    <link to={'/workspace' + element.workspace._id}>Ir a espacio de trabajo </link>
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div> 
    )
}

export default HomeScreen