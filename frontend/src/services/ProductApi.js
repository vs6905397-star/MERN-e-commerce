import api from "./api"

export const getProducts = async () => {
    const response = await api.get("/products");

    return response.data;
};

export const getSingleProduct = async (id) => {
    const response = await api.get(`/products/${id}`);

    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/products/${id}`);

    return response.data;
};

export const createProduct = async (productData) => {
    const response = await api.post(`/products/create`, productData, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    });

    return response.data;
};

 export const updateProduct = async (id, productData) => {

  const res = await api.put(`/products/${id}`, productData);

  return res.data;
}

