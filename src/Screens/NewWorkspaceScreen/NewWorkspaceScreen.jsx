import React from 'react'
import useCustomQuery from '../../hooks/useCustomQuery'
import useForm from '../../hooks/useForm'

const NewWorkspaceScreen = () => {
    const {response, loading, error} = useCustomQuery()
  
    const initial_form_state = {
        name: '',
        description: ''
    }

    const handleSubmitNewWorkspace = () => {

    }
    const {form_state, handleSubmit, handleChange} = useForm({ 
        onSubmit: handleSubmitNewWorkspace, 
        initial_form_state
    })
    return(
        <div>
            <h1>New Workspace</h1>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor = 'name'>Name</label>
                    <input 
                        type = 'text' 
                        name = 'name' 
                        id = 'name'
                        value = {form_state.name} 
                        onChange = {handleChange} 
                    />
                </div>
                <div>
                    <button type = 'submit'>Create workspace</button>
                </div>
            </form>
        </div>
    )
}

export default NewWorkspaceScreen