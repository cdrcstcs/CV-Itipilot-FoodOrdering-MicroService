import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext, Control } from "react-hook-form";
import { useUploadImage, useGetImageById } from "@/api/ImageApi";

const ImageSection = () => {
  const { control, watch } = useFormContext();
  const { uploadImage} = useUploadImage();
  const imageId = watch("imageId");
  const { imageUrl: existingImage} = useGetImageById(imageId);
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const imageFile = event.target.files?.[0];
      if (!imageFile) return null;
      const formData = new FormData();
      formData.append("image", imageFile);
      const imageIdRes = await uploadImage(formData);
      console.log("Uploaded image URL:", imageIdRes);
      return imageIdRes;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that will be displayed on your restaurant listing in the
          search results. Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 md:w-[50%]">
        {/* Display existing image if available */}
        {(existingImage) && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImage}
              alt="Existing Image"
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}
        <FormField
          control={control as Control} // Ensure control is typed correctly
          name="imageId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) =>
                    field.onChange(
                      handleImageUpload(event)
                    )
                  }                
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
export default ImageSection;
