
import { SOCKET_EVENTS } from "../constants";
import { addMessage, changeOnlineMember, initOnlineMembers } from "../redux/chatReducer";

const listenChatEvents = (dispatch, listen) => {
    listen(SOCKET_EVENTS.MESSAGE_RECIEVED, (data) => {
        const { message } = data;
        const { spaceId } = message;
        dispatch(addMessage({ message, spaceId }));
    });
    listen(SOCKET_EVENTS.JOINED_CHAT, (data) => {
        const { profileId } = data;
        dispatch(changeOnlineMember({ profileId, isOnline: true }));
    });
    listen(SOCKET_EVENTS.LEFT_CHAT, (data) => {
        const { profileId } = data;
        dispatch(changeOnlineMember({ profileId, isOnline: false }));
    });
    listen(SOCKET_EVENTS.RECIEVED_ONLINE_MEMBER, (data) => {
        const { spaceId, onlineMembers } = data;
        dispatch(initOnlineMembers({ onlineMembers, spaceId }));
    });
};

export default listenChatEvents;
