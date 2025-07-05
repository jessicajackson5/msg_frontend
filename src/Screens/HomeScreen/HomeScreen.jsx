import React, { useEffect, useState } from 'react'
import './HomeScreen.css'
import { getAllWorkspaces } from '../../services/workspaceService.js'
import { Link } from 'react-router-dom'
import LogoutButton from '../../Components/LogoutButton/LogoutButton'

const HomeScreen = () => {
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(true)

  const getWorkspaces = async () => {
    try {
      setLoading(true)
      const data = await getAllWorkspaces()
      if (!data?.data?.workspaces) {
        throw new Error('Invalid response format')
      }
      setResponse(data)
    }
    catch (error) {
      console.error('Error in obtaining workspaces', error)
      setResponse({ data: { workspaces: [] } }) // fallback to empty array
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getWorkspaces()
  }, [])

  return (
    <div className="home-container">
      <LogoutButton />
      <div className="home-header">
        <div className="header-content">
          <h1>Your Workspaces</h1>
          <p>Manage and collaborate in your workspaces</p>
          <Link to={'/new'} className="create-workspace-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New Workspace
          </Link>
        </div>
      </div>

      <div className="workspaces-section">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <h2>Loading your workspaces...</h2>
            <p>Please wait while we fetch your workspaces</p>
          </div>
        ) : (
          <div className="workspaces-grid">
            {response.data.workspaces.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                  </svg>
                </div>
                <h2>No workspaces yet</h2>
                <p>Create your first workspace to get started with collaboration</p>
                <Link to={'/new'} className="btn-primary">
                  Create Your First Workspace
                </Link>
              </div>
            ) : (
              response.data.workspaces.map((element) => (
                <div key={element.workspace._id} className="workspace-card">
                  <div className="workspace-card-header">
                    <div className="workspace-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9,22 9,12 15,12 15,22"></polyline>
                      </svg>
                    </div>
                    <h3>{element.workspace.name}</h3>
                  </div>
                  <div className="workspace-card-content">
                    <p>Collaborate with your team in this workspace</p>
                    <div className="workspace-stats">
                      <span className="stat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        Members
                      </span>
                      <span className="stat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Channels
                      </span>
                    </div>
                  </div>
                  <div className="workspace-card-actions">
                    <Link to={'/workspaces/' + element.workspace._id} className="btn-primary">
                      Open Workspace
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeScreen
