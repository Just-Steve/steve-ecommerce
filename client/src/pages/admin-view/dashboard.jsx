import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";

function AdminDashboard() {
  const dispatch = useDispatch();

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const { featureImageList } = useSelector((state) => state.commonFeature);

  // Fetch feature images on component mount
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  // Handle Upload
  const handleUploadFeatureImage = async () => {
    setUploadError("");
    if (!uploadedImageUrl) {
      setUploadError("Please provide a valid image URL.");
      return;
    }

    try {
      setImageLoadingState(true);
      const result = await dispatch(addFeatureImage(uploadedImageUrl));

      if (result?.payload?.success) {
        await dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      } else {
        setUploadError("Failed to upload the image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("An error occurred during upload.");
    } finally {
      setImageLoadingState(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        isEditMode={false}
      />

      <Button
        onClick={handleUploadFeatureImage}
        className="mt-5 w-full"
        disabled={imageLoadingState}
      >
        {imageLoadingState ? "Uploading..." : "Upload"}
      </Button>

      {uploadError && (
        <p className="text-red-500 mt-2 text-sm">{uploadError}</p>
      )}

      <div className="flex flex-col gap-4 mt-5">
        {featureImageList?.length > 0 ? (
          featureImageList.map((item) => (
            <div key={item._id} className="relative">
              <img
                src={item.image}
                alt={`Feature ${item._id}`}
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center mt-4">
            No feature images uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
