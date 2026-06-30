import api from "./api"

export const placeOrder = async (orderData) => {
    const res = await api.post("/orders", orderData);
    
    return res.data;
  }

  export const getOrder = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get("/orders/userorder", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return res.data;
  }

  export const getAllOrders = async () => {
    const token = localStorage.getItem("token");
    const res = await api.get("/orders/allorder", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return res.data;
  }

  export const updateOrder = async (id, orderData) => {

  const res = await api.put(`/orders/${id}`, orderData);

  return res.data;
}

export const deleteOrder = async (id) => {

  const res = await api.delete(`/orders/${id}`);

  return res.data;
}