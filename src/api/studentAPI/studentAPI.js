import axiosAuth from "../axiosAuth";
import axiosClient from "../axiosClient";


const studentAPI = {
    getStudentsByMajorID:(id)=>{
        const url = `/majors/${id}/students/`;
        return axiosAuth().get(url);
    }
};
export default studentAPI;