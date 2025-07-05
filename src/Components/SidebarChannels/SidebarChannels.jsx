import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './SidebarChannels.css'

const SidebarChannels = ({
    channels,
    is_creating_channel,
    onCreateChannelClick,
    onCreateChannelCancel,
    onCreateChannelSubmit,
    form_state,
    onFormChange
}) => {
    const [searchTerm, setSearchTerm] = useState('')

    // Filter channels based on search term
    const filteredChannels = useMemo(() => {
        if (!searchTerm.trim()) {
            return channels || []
        }
        return (channels || []).filter(channel =>
            channel.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [channels, searchTerm])

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const clearSearch = () => {
        setSearchTerm('')
    }

    return (
        <aside className="sidebar-channels">
            <div className="sidebar-top-row">
                {!is_creating_channel ? (
                    <button onClick={onCreateChannelClick} className="create-channel-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        New Channel
                    </button>
                ) : (
                    <form onSubmit={onCreateChannelSubmit} className="create-channel-form">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder='Channel name'
                                onChange={onFormChange}
                                name='name'
                                value={form_state.name}
                                className="channel-name-input"
                                autoFocus
                            />
                        </div>
                        <div className="form-actions">
                            <button type='submit' className="btn-primary">Create</button>
                            <button type='button' onClick={onCreateChannelCancel} className="btn-secondary">Cancel</button>
                        </div>
                    </form>
                )}
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search channels..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="search-input"
                        />
                        {searchTerm && (
                            <button 
                                onClick={clearSearch}
                                className="clear-search-btn"
                                type="button"
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <nav className="channels-nav">
                <div className="channels-header">
                    <h3>Channels</h3>
                    <span className="channel-count">
                        {filteredChannels.length} {filteredChannels.length === 1 ? 'channel' : 'channels'}
                    </span>
                </div>
                <div className="channels-list">
                    {filteredChannels.length > 0 ? (
                        filteredChannels.map((channel) => (
                            <Link
                                key={channel._id}
                                to={`/workspaces/${channel.workspace_id}/channels/${channel._id}`}
                                className="channel-link"
                            >
                                <svg className="channel-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                <span className="channel-name">{channel.name}</span>
                            </Link>
                        ))
                    ) : searchTerm ? (
                        <div className="no-results">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <p>No channels found for "{searchTerm}"</p>
                            <button onClick={clearSearch} className="clear-search-text">
                                Clear search
                            </button>
                        </div>
                    ) : (
                        <div className="no-channels">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <p>No channels available</p>
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    )
}

export default SidebarChannels
