import {create} form "zustand";
import {axiosInstance} from "../lib/axios";
import toast from 'react-hot-toast';

export const useChatStore = create ((set)=>({
    message : [],
    users:[],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false

    getUsers : async () =>{
        set({isUsersLoading : true});

        try{
            const res = await axiosInstance.get("/messages/users");
            set({users : res.data});
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isUsersLoading : false})
        }
    }, 
}))


