import axios from "axios";

// Base de URL:https://api.themoviedb.org/3/
// URL da API:https://api.themoviedb.org/3/movie/now_playing?api_key=d00ad2f16fdb19fd0e3d044de187e1e9&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});


export default api;