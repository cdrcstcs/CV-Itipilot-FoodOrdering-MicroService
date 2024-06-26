import { useMutation } from "react-query";
import { useQuery } from "react-query";
export const useUploadImage = () => {
  const uploadImageRequest = async (image: FormData): Promise<string> => {
    const response = await fetch(`http://localhost:7000/image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust as per your authentication method
      },
      body: image,
    });
    if (!response.ok) {
      console.log('haha');
      throw new Error("Failed to upload image");
    }
    const data = await response.json();
    return data.image._id; // Assuming the API responds with the image path or ID
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
    const response = await fetch(`http://localhost:7000/image/${imageId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust as per your authentication method
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }
    const data = await response.json();
    console.log(data.image);
    return data.image; // Adjust as per your API response structure
  };
  const { data: imageUrl, isLoading, isError, error } = useQuery(
    ["getImageById", imageId],
    getImageByIdRequest
  );
  return { imageUrl, isLoading, isError, error };
};
