import React, { useEffect, useState } from 'react'
import { createChannel, getChannels } from '../../services/channelService'
import { Navigate, useParams } from 'react-router-dom'
import SidebarChannels from '../../Components/SidebarChannels/SidebarChannels'
import useCustomQuery from '../../hooks/useCustomQuery'
import Chat from '../../Components/Chat/Chat'
import { useForm } from '../../hooks/useForm'

const WorkspaceDetailScreen = () => {
    const {workspace_id, channel_id} = useParams()
    const [is_creating_channel, setIsCreatingChannel] = useState(false)
    const handleSubmitNewChannel = () => {
        sendRequest( async () => await createChannel({name: form_state.name, workspace_id: workspace_id}))
        setIsCreatingChannel(false)
    }
    const initial_form_state = {
        name: ''
    }
    const { form_state, handleSubmit, handleChange } = useForm({
        onSubmit: handleSubmitNewChannel,
        initial_form_state
    })

     useEffect(() => {
        sendRequest( async () => getChannels({workspace_id}))
    }, [])

    const handleChangeCreateMode = () => {
        setIsCreatingChannel(true)
    }

    const handleQuitCreateMode = () => {
        setIsCreatingChannel(false)
    }

    /* const [channels_response, setChannelsResponse] = useState([]) */
    /* const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null) */
    const {
        response: channels_response, 
        error, 
        loading, 
        sendRequest
    } = useCustomQuery()
    
    /* Si no estoy cargando y tengo canales */
    if(!loading && channels_response){
        if(!channel_id && channels_response?.data?.channels?.length > 0){
            /* Lo redirijo al primer canal */
            return <Navigate to={`/workspaces/${workspace_id}/channels/${channels_response.data.channels[0]._id}`}/>
        }
    }

    if(loading){
        return ( 
            <div>
                <h1>Loading workspaces...</h1>
            </div>
        )
    }


    return (
        <div>
            <h1>Workspace Details</h1>
            <div>
                {
                    !loading && channels_response && <SidebarChannels channels={channels_response?.data?.channels}/>
                }
                {
                !is_creating_channel 
                ? <button onClick={handleChangeCreateMode}>Create a channel</button>
                :
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">Channel name: </label>
                        <input 
                            type="text" 
                            placeholder='New channel' 
                            onChange={handleChange} 
                            name='name' 
                            value={form_state.name} 
                        />
                    </div>
                    <button type='submit'>Create</button>
                    <button type='button' onClick={handleQuitCreateMode}>Cancel</button>
                </form>
            }
            </div>
           
            {
                channel_id 
                && !loading 
                && channels_response 
                && channels_response?.data?.channels?.length > 0 
                && <Chat/>
            }
        </div>
    )
}

export default WorkspaceDetailScreen