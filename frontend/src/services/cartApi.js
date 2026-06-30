import api from "./api"

export const addToCart = async (productId, quantity = 1 ) => {
    const res = await api.post("/cart/add", {productId, quantity});
    
    return res.data;
  }

export const getCart = async () => {
  const res = await api.get("/cart");

  return res.data;
}

export const updateCart = async (id, quantity) => {

  const res = await api.put(`/cart/update/${id}`, {quantity});

  return res.data;
}

export const deleteCart = async (id) => {

  const res = await api.delete(`/cart/delete/${id}`);

  return res.data;
}

export const clearCart = async () => {

  const res = await api.delete(`/cart/clear`);

  return res.data;
}

