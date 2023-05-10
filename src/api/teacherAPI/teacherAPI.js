import axiosAuth from "../axiosAuth";
import axiosClient from "../axiosClient";


const teacherAPI = {
    getTeachersByMajorID:(id)=>{
        const url = `/majors/${id}/teachers/`;
        return axiosAuth().get(url);
    }
};
export default teacherAPI;