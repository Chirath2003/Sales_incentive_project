import axios from 'axios';

const API_BASE_URL = `http://localhost:8000/api/slab-level`;

export const slabAPI = {
    // Fetch all slab levels
    getAllSlabs: async () => {
        const response = await axios.get(`${API_BASE_URL}/`);
        return response.data;
    },

    // Fetch single slab by ID
    getSlabById: async (id) => {
        const response = await axios.get(`${API_BASE_URL}/${id}/`);
        return response.data;
    },

    // Create new slab
    createSlab: async (slabData) => {
        const response = await axios.post(`${API_BASE_URL}/`, slabData);
        return response.data;
    },

    // Update existing slab
    updateSlab: async (id, slabData) => {
        const response = await axios.put(`${API_BASE_URL}/${id}/`, slabData);
        return response.data;
    },

    // Delete slab
    deleteSlab: async (id) => {
        const response = await axios.delete(`${API_BASE_URL}/${id}/`);
        return response.data;
    }
};