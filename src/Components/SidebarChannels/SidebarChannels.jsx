import React from 'react'
import { Link } from 'react-router-dom'

const SidebarChannels = ({channels}) => {

    return (
        <aside>
            <nav>
                {
                channels?.length > 0 
                ? channels.map((channel) => {
                    return (
                        <React.Fragment key={channel._id} >
                            <Link 
                                
                                to={`/workspaces/${channel.workspace_id}/channels/${channel._id}`}
                            >
                                {channel.name}
                            </Link>
                            <br/>
                        </React.Fragment>
                        
                    )
                })
                : <p>There are no channels available</p>
                }
            </nav>
        </aside>
    )
}

export default SidebarChannels
