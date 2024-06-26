import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext, Control } from "react-hook-form";
import { useUploadImage } from "@/api/ImageApi";

const ImageSection = () => {
  const { control, setValue} = useFormContext();
  const { uploadImage } = useUploadImage();
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const imageFile = event.target.files?.[0];
      if (!imageFile) return;

      const formData = new FormData();
      formData.append("file", imageFile);

      const uploadedImageId = await uploadImage(formData);
      setValue("imageId", uploadedImageId); // Assuming uploadedImageId is a string
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
        <FormField
          control={control as Control}
          name="imageId"
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) =>
                    handleImageUpload(event)
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
