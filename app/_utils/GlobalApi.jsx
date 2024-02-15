const { default: axios } = require("axios");


const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient=axios.create({
    baseURL:'http://localhost:1337/api',
    headers:{
        'Authorization':`Bearer ${API_KEY}`
    }
})

 const getCategory=()=>axiosClient.get('/categories?populate=*');

 const getDoctorList=()=>axiosClient.get('/doctors?populate=*')
 
 const getDoctorByCategory=(category)=>axiosClient.get('/doctors?filters[categories][Name][$in]='+category+"&populate=*")
 
 const getDoctorById=(id)=>axiosClient.get('/doctors/'+id+"?populate=*")

 const bookAppointment=(data)=>axiosClient.post('/appointments',data);
 
 export default{
    getCategory,
    getDoctorList,
    getDoctorByCategory,
    getDoctorById,
    bookAppointment
}