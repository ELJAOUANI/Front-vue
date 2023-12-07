import { defineStore } from "pinia";
export const auth = defineStore('auth', {
    state: () => ({
        token: null,
        user : null 
    }),
    getters: {
    },
    actions: {
        setToken(token: any) {
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
        },
        setUser(user:any){
            this.user = user
        } 
    },
})