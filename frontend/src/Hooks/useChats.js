import useResource from "./useResource";

const useChats = (userId) => {
    const {resources: chats} = useResource('chats/user', {userId});

    return {chats};
};

export default useChats;