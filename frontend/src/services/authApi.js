import api from "./api"

export const singUp = async (userData) => {
    const res = await api.post("/signup", userData);
    
    return res.data;
  }

  export const login = async (userData) => {
    const res = await api.post("/login", userData);
    
    return res.data;
  }


  export const logout = async () => {
    const res = await api.post("/logout");
    
    return res.data;
  }
  
  export const getCurrentUser = async () => {
    const res = await api.get("/me");

    return res.data;
  }

  export const updateAddress = async (data) => {
    const res = await api.put("/address", data);

    return res.data;
  }
