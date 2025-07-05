import React, { useEffect, useState } from 'react'
import { createChannel, getChannels } from '../../services/channelService'
import { Navigate, useParams } from 'react-router-dom'
import SidebarChannels from '../../Components/SidebarChannels/SidebarChannels'
import useCustomQuery from '../../hooks/useCustomQuery'
import Chat from '../../Components/Chat/Chat'
import { useForm } from '../../hooks/useForm'
import './WorkspaceDetailScreen.css'

const WorkspaceDetailScreen = () => {
    const { workspace_id, channel_id } = useParams()
    const [is_creating_channel, setIsCreatingChannel] = useState(false)
    
    const handleSubmitNewChannel = () => {
        sendRequest(async () => await createChannel({ name: form_state.name, workspace_id: workspace_id }))
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
        sendRequest(async () => getChannels({ workspace_id }))
    }, [])

    const handleChangeCreateMode = () => {
        setIsCreatingChannel(true)
    }

    const handleQuitCreateMode = () => {
        setIsCreatingChannel(false)
    }

    const {
        response: channels_response,
        error,
        loading,
        sendRequest
    } = useCustomQuery()

    /* Si no estoy cargando y tengo canales */
    if (!loading && channels_response) {
        if (!channel_id && channels_response?.data?.channels?.length > 0) {
            /* Lo redirijo al primer canal */
            return <Navigate to={`/workspaces/${workspace_id}/channels/${channels_response.data.channels[0]._id}`} />
        }
    }

    if (loading) {
        return (
            <div className="workspace-loading">
                <div className="loading-spinner"></div>
                <h2>Loading workspace...</h2>
                <p>Please wait while we load your channels</p>
            </div>
        )
    }

    return (
        <div className="workspace-detail-container">
            <div className="workspace-sidebar">
                <div className="sidebar-header">
                    <h1>Workspace</h1>
                </div>
                {!loading && channels_response && (
                    <SidebarChannels 
                        channels={channels_response?.data?.channels}
                        is_creating_channel={is_creating_channel}
                        onCreateChannelClick={handleChangeCreateMode}
                        onCreateChannelCancel={handleQuitCreateMode}
                        onCreateChannelSubmit={handleSubmit}
                        form_state={form_state}
                        onFormChange={handleChange}
                    />
                )}
            </div>
            <div className="workspace-content">
                {channel_id && !loading && channels_response && channels_response?.data?.channels?.length > 0 ? (
                    <Chat />
                ) : (
                    <div className="no-channel-selected">
                        <div className="no-channel-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <h2>Select a Channel</h2>
                        <p>Choose a channel from the sidebar to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WorkspaceDetailScreen