import LoadingButton from './LoadingButton';
import { useGetImageById } from '@/api/ImageApi';
export const Avatar = ({ imageId }: { imageId: string }) => {
  const { imageUrl: existingImage} = useGetImageById(imageId);
  return (
    <div>
      {existingImage ? (
        <div>
          <img
            src={`http://localhost:4000/${existingImage}`}
            alt={existingImage}
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
        </div>
      ) : (
        <LoadingButton></LoadingButton>
      )}
    </div>
  );
};
