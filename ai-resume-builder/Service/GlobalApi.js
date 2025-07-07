import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const createNewResume = (data) => {
    return axiosClient.post('/user-resumes', data);
}
//ithe he evdha motha url apan equal data sathi takla ahe manjhe fakt data hava ahe config vagare nako
const GetUserResumes=(userEmail)=>axiosClient.get('/user-resumes?filters[userEmail][$eq]='+userEmail);

const UpdateResumeDetail=(id,data)=>axiosClient.put('/user-resumes/'+id,data);

export default {
    createNewResume,
    GetUserResumes,
    UpdateResumeDetail
}