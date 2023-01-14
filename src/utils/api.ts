import axios from 'axios';

export const getTagsAndCategories = async (name: string, item: string) => {
    const res = await axios.get(`${import.meta.env.VITE_STRAPI_API}/api/${name}-${item}`);
    return res.data;
}