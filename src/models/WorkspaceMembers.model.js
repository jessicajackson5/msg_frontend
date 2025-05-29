import mongoose from "mongoose";
import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionaries/availableRoles.dictionary.js";


const workspaceMembersSchema = new mongoose.Schema(
    {
        workspace_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workspace',
            required: true
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            required: true,
            default: AVAILABLE_ROLES_WORKSPACE_MEMBERS.MEMBER,
            enum: Object.values(AVAILABLE_ROLES_WORKSPACE_MEMBERS) /* Otra forma valida: AVAILABLE_ROLES_WORKSPACE_MEMBERS */ //Limitamos a solo estos strings
        },
        created_at: {
            type: Date,
            default: new Date()
        }
    }
)

const WorkspaceMember = mongoose.model('members_workspaces', workspaceMembersSchema)

export default WorkspaceMember