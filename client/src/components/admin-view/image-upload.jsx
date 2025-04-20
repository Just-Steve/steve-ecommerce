import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  // Handle file selection via click or drag/drop
  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  // Remove selected file
  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl("");
    if (inputRef.current) inputRef.current.value = "";
  }

  // Upload + save feature when a new file is chosen
  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const formData = new FormData();
    formData.append("my_file", imageFile);

    try {
      // 1) Upload to Cloudinary via your admin/products endpoint
      const uploadRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
        formData,
        { withCredentials: true }
      );

      if (!uploadRes.data?.success) {
        throw new Error("Cloudinary upload failed");
      }

      const imageUrl = uploadRes.data.result.url;
      setUploadedImageUrl(imageUrl);

      // 2) Save feature image URL in your common feature collection
      const saveRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/common/feature/add`,
        { image: imageUrl },
        { withCredentials: true }
      );

      if (!saveRes.data?.success) {
        throw new Error(saveRes.data?.message || "Saving feature failed");
      }

      console.log("Feature image saved:", saveRes.data.data);

    } catch (error) {
      console.error("Upload or save error:", error);
      // Optionally show a toast here
    } finally {
      setImageLoadingState(false);
    }
  }

  // Trigger upload when a file is selected
  useEffect(() => {
    if (imageFile) {
      uploadImageToCloudinary();
    }
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${isEditMode ? "cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
