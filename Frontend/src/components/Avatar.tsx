import { useEffect, useState } from 'react';
import LoadingButton from './LoadingButton';
export const Avatar = ({ imageId }: { imageId: string }) => {
  const [image, setImage] = useState<string | null>(null);

  const fetchImage = async () => {
    try {
      const response = await fetch(`http://localhost:4500/map_i/${imageId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const imageData = await response.json();
      setImage(imageData.image);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };
  useEffect(() => {
    fetchImage();
  }, []);
  return (
    <div>
      {image ? (
        <div>
          <img
            src={`http://localhost:4000/${image}`}
            alt={image}
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
        </div>
      ) : (
        <LoadingButton></LoadingButton>
      )}
    </div>
  );
};
