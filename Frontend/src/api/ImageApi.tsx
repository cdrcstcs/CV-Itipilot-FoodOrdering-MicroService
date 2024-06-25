import { useMutation } from "react-query";
import { useQuery } from "react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useUploadImage = () => {
  const uploadImageRequest = async (formData: FormData): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust as per your authentication method
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    const data = await response.json();
    return data.image; // Assuming the API responds with the image path or ID
  };
  const {
    mutateAsync: uploadImage,
    isLoading,
    isError,
    error,
  } = useMutation(uploadImageRequest);
  return { uploadImage, isLoading, isError, error };
};
export const useGetImageById = (imageId: string) => {
  const getImageByIdRequest = async (): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/api/images/${imageId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust as per your authentication method
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }
    const data = await response.json();
    return data.image; // Adjust as per your API response structure
  };
  const { data: imageUrl, isLoading, isError, error } = useQuery(
    ["getImageById", imageId],
    getImageByIdRequest
  );
  return { imageUrl, isLoading, isError, error };
};
