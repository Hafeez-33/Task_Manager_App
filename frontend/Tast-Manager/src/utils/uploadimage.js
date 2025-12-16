import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosinstance";

const uploadimage = async (imageFile) => {
    const formData = new FormData();
    //append image file to form data
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE_UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data", //set header for file upload
            },
        });
        return response.data; //return uploaded image data
    } catch (error) {
        console.error("Image upload failed", error);
        throw error;//rethrow error to be handled by caller
    }
}

export default uploadimage;