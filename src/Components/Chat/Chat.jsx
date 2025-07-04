import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useCustomQuery from '../../hooks/useCustomQuery'
import { createNewMessage, getAllMessagesByChannelId } from '../../services/messagesService'
import { useForm } from '../../hooks/useForm' 

const Chat = () => {
    const {channel_id, workspace_id} = useParams()
    const { response: server_messages_response, loading, error, sendRequest } = useCustomQuery()
    useEffect( () => {
        sendRequest( async () => getAllMessagesByChannelId({channel_id, workspace_id}))
    }, [channel_id]) //Dependencias: channel_id, cada vez que cambie el channel_id se ejecuta el useEffect
    
    const initial_state_form = {
        content: ''
    }
    const handleSubmitNewMessage = () => {
        sendRequest(
            async () => await createNewMessage({channel_id, workspace_id, content: form_state.content})
        )
    }
    const {form_state, handleSubmit, handleChange} = useForm({
        onSubmit: handleSubmitNewMessage,
        initial_form_state: initial_state_form
    })
    if(loading) return <span>Loading...</span>
    return (
        <div>
            <h1>Messages:</h1>
            {
                server_messages_response && server_messages_response?.data?.messages.map( (message) => 
                    <div key={message._id}>
                        <b>Author: {message.user.name}</b>
                        <p>{message.content}</p>
                    </div>
                )
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="content">Write your message:</label>
                    <textarea name="content" id="content" onChange={handleChange} value={form_state.content}></textarea>
                </div>
                <button type="submit">Send message</button>
            </form>
        </div>
    )
}

export default Chat