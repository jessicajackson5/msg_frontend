
import React, { useEffect, useState } from 'react'
import './HomeScreen.css'
import { getAllWorkspaces } from '../../services/workspaceService'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(true)

  const getWorkspaces = async ( ) => {
    try{
        setLoading(true)
        const data = await getAllWorkspaces()
        if (!data?.data?.workspaces) {
            throw new Error('Invalid response format')
        }
        setResponse(data)
    }
    catch(error){
      console.error('Error in obtaining workspaces', error)
      setResponse({ data: { workspaces: [] } }) // fallback to empty array
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(
    () => {
      getWorkspaces()
    }, 
    []
  )


  return (
    <div>
      <h1>Your Workspaces</h1>
      <Link to={'/new'}>
        Create a new workspace
      </Link>
      <div>
        {
          loading 
          ? <h2>Loading...</h2>
          : <div>
            {
              response.data.workspaces.map(
                (element) => {
                  return (
                    <div key={element.workspace._id}>
                      <h2>{element.workspace.name}</h2>
                      <Link to={'/workspaces/' + element.workspace._id}> Go to your workspace</Link>
                    </div>
                  )
                }
              )
            }
          </div>
        }
      </div>
    </div>
  )
}

export default HomeScreen
