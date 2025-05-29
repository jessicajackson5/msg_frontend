import mongoose from "mongoose";

const channelMembersSchema = new mongoose.Schema({
    channel_id: {
        type: mongoose.Schema.Type.ObjectId,
        ref: "Channel",
        required: true,
    },
    member_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
});
const ChannelMembers = mongoose.model("channels_members", channelMembersSchema);
export default ChannelMembers;