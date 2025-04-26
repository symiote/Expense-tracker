import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage =async(imageFile)=>{
    const formData = new FormData();
    //append image file to form data 
    formData.append("image",imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE ,formData,{
            headers:{
                "Content-Type":"multipart/form-data" //set header for file uplaod
            },

        });
        return response.data;
    } catch (error) {
        console.log("Error uploading the image : ",error);
        throw error;
    } //rethow for error handling 
}

export default uploadImage; 