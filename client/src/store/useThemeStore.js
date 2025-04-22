import {create} rom "zustand";

export const useThemeStore = create((set)=> ({
    theme : localStorage.getItem("chat-theme") || "coffee",
    setTheme : (theme) =>{
        localStorage.setItem("chat-theme", theme);
        set({theme})
    }
}))