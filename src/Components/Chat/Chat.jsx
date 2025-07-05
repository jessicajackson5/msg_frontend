import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import useCustomQuery from '../../hooks/useCustomQuery'
import { createNewMessage, getAllMessagesByChannelId } from '../../services/messagesService'
import { getChannels } from '../../services/channelService'
import useForm from '../../hooks/useForm'
import './Chat.css'

const Chat = () => {
    const { channel_id, workspace_id } = useParams()
    const { response: server_messages_response, loading, error, sendRequest } = useCustomQuery()
    const [channelName, setChannelName] = useState('Channel')
    const messagesEndRef = useRef(null)

    // Fetch channel name when channel_id changes
    useEffect(() => {
        const fetchChannelName = async () => {
            try {
                const channelsResponse = await getChannels({ workspace_id })
                if (channelsResponse?.data?.channels) {
                    const channel = channelsResponse.data.channels.find(ch => ch._id === channel_id)
                    if (channel) {
                        setChannelName(channel.name)
                        document.title = `${channel.name} - Message App`
                    }
                }
            } catch (error) {
                console.error('Error fetching channel name:', error)
                setChannelName('Channel')
                document.title = 'Channel - Message App'
            }
        }
        
        if (workspace_id && channel_id) {
            fetchChannelName()
        }
    }, [workspace_id, channel_id])
    
    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [server_messages_response?.data?.messages])
    
    const initial_state_form = {
        content: ''
    }
    
    const handleSubmitNewMessage = () => {
        sendRequest(
            async () => await createNewMessage({ channel_id, workspace_id, content: form_state.content })
        ).then(() => {
            // Clear the input field after successful message send
            handleChange({ target: { name: 'content', value: '' } })
        }).catch((error) => {
            console.error('Error sending message:', error)
            // Don't clear the input if there was an error, so user can retry
        })
    }
    
    const { form_state, handleSubmit, handleChange } = useForm({
        onSubmit: handleSubmitNewMessage,
        initial_form_state: initial_state_form
    })
    
    if (loading) {
        return (
            <div className="chat-loading">
                <div className="loading-spinner"></div>
                <h2>Loading messages...</h2>
                <p>Please wait while we load the conversation</p>
            </div>
        )
    }
    
    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="chat-header-content">
                    <div className="channel-info">
                        <h1>{channelName}</h1>
                        <span className="message-count">
                            {server_messages_response?.data?.messages?.length || 0} messages
                        </span>
                    </div>
                </div>
            </div>

            <div className="messages-container">
                {server_messages_response?.data?.messages?.length > 0 ? (
                    server_messages_response.data.messages.map((message) => (
                        <div key={message._id} className="message">
                            <div className="message-avatar">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div className="message-content">
                                <div className="message-header">
                                    <span className="message-author">{message.user.name}</span>
                                    <span className="message-time">
                                        {new Date(message.created_at).toLocaleTimeString([], { 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        })}
                                    </span>
                                </div>
                                <div className="message-text">{message.content}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-messages">
                        <div className="no-messages-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <h2>No messages yet</h2>
                        <p>Be the first to start the conversation in <strong>{channelName}</strong>!</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="message-input-container">
                <form onSubmit={handleSubmit} className="input-wrapper">
                    <input
                        type="text"
                        name="content"
                        value={form_state.content}
                        onChange={handleChange}
                        placeholder={`Type your message in ${channelName}...`}
                        className="message-input"
                        required
                    />
                    <button type="submit" className="send-button" disabled={!form_state.content.trim()}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat