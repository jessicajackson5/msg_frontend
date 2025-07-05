import React, { useEffect } from 'react'
import useForm from '../../hooks/useForm'
import useCustomQuery from '../../hooks/useCustomQuery'
import { createWorkspace } from '../../services/workspaceService'
import { Link, useNavigate } from 'react-router-dom'
import './NewWorkspaceScreen.css'

const NewWorkspaceScreen = () => {
    const navigate = useNavigate()
    const { response, loading, error, sendRequest } = useCustomQuery()
    const initial_form_state = {
        name: '',
        description: ''
    }

    const handleSubmitNewWorkspace = () => {
        sendRequest(async () => await createWorkspace(form_state))
    }

    const { form_state, handleSubmit, handleChange } = useForm({
        onSubmit: handleSubmitNewWorkspace,
        initial_form_state
    })

    useEffect(() => {
        if(response && !loading && response.ok){
            navigate(`/home`)
        }
    }, [response])


    return (
        <div className="new-workspace-container">
            <Link to={'/home'} className="back-link">
                ← Return to my workspaces
            </Link>
            {
                loading
                    ? <div className="loading-text">Loading...</div>
                    : <div className="workspace-form-container">
                        <h1>Create a Workspace</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor='name'>Name</label>
                                <input
                                    type="text"
                                    name='name'
                                    id='name'
                                    value={form_state.name}
                                    onChange={handleChange}
                                    placeholder="Enter workspace name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor='description'>Description</label>
                                <input
                                    type="text"
                                    name='description'
                                    id='description'
                                    value={form_state.description}
                                    onChange={handleChange}
                                    placeholder="Enter workspace description"
                                />
                            </div>
                            <button type="submit" className="submit-button">
                                Create Workspace
                            </button>
                        </form>
                    </div>
            }
        </div>
    )
}

export default NewWorkspaceScreen