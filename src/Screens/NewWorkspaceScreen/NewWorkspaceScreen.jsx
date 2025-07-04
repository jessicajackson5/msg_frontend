import React, { useEffect } from 'react'
import { useForm } from '../../hooks/useForm'
import useCustomQuery from '../../hooks/useCustomQuery'
import { createWorkspace } from '../../services/workspaceService'
import { Link, useNavigate } from 'react-router-dom'

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
        <div>
            <Link to={'/home'}>
                Return to my workspaces
            </Link>
            {
                !loading
                    ? <span>loading...</span>
                    : <>

                        <h1>Create a Workspace</h1>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor='name'>Name</label>
                                <input
                                    type="text"
                                    name='name'
                                    id='name'
                                    value={form_state.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor='description'>Description</label>
                                <input
                                    type="text"
                                    name='description'
                                    id='description'
                                    value={form_state.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <button>Create Workspace</button>
                        </form>
                    </>
            }

        </div>
    )
}

export default NewWorkspaceScreen