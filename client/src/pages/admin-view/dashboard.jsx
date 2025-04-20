// import ProductImageUpload from "@/components/admin-view/image-upload";
// import { Button } from "@/components/ui/button";
// import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function AdminDashboard() {
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState("");

//   const dispatch = useDispatch();
//   const featureImageList = useSelector((state) => state.commonFeature.featureImageList);

//   const handleUploadFeatureImage = async () => {
//     setUploadError("");
//     if (!uploadedImageUrl) {
//       setUploadError("No image URL provided");
//       return;
//     }
//     setIsUploading(true);
//     try {
//       const result = await dispatch(addFeatureImage(uploadedImageUrl));
//       if (result?.payload?.success) {
//         await dispatch(getFeatureImages());
//         setImageFile(null);
//         setUploadedImageUrl("");
//       } else {
//         setUploadError("Failed to upload the image");
//       }
//     } catch (error) {
//       console.error("Error while uploading the image:", error);
//       setUploadError("An error occurred while uploading the image");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   return (
//     <div>
//       <ProductImageUpload
//         imageFile={imageFile}
//         setImageFile={setImageFile}
//         uploadedImageUrl={uploadedImageUrl}
//         setUploadedImageUrl={setUploadedImageUrl}
//         setImageLoadingState={setIsUploading}  // Prop renamed to meet the child's expectation
//         imageLoadingState={isUploading}
//         isCustomStyling={true}
//         isEditMode={false}                     // Provide a default value if needed
//       />
//       <Button onClick={handleUploadFeatureImage} className="mt-5 w-full" disabled={isUploading}>
//         {isUploading ? "Uploading..." : "Upload"}
//       </Button>
//       {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
//       <div className="flex flex-col gap-4 mt-5">
//         {featureImageList && featureImageList.length > 0 ? (
//           featureImageList.map((featureImgItem) => (
//             <div key={featureImgItem.id} className="relative">
//               <img
//                 src={featureImgItem.image}
//                 className="w-full h-[300px] object-cover rounded-t-lg"
//                 alt="Feature"
//               />
//             </div>
//           ))
//         ) : (
//           <p>No feature images found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
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


      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>

      <div className="flex flex-col gap-4 mt-5">
        {featureImageList?.length > 0
          ? featureImageList.map((item) => (
              <div key={item._id} className="relative">
                <img
                  src={item.image}
                  alt={`Feature ${item._id}`}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;

