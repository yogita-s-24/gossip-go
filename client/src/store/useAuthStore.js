import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser : null,
    isCheckingAuth : true,
    isSigningup : false,
    isLoggingIng : false,
    isUpdatingProfile : false,
    checkAuth : async () =>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUer : res.data});
        } catch (error) {
            console.log("Error in checkAuth : ", error);
            set({authUser : null});
        }
        finally{
            set({
                isCheckingAuth : false
            });
        }
    }
}))