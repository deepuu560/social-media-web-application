export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "x-clone-images");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/ncp1qtpo/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Image upload failed.");
  }

  const data = await response.json();

  return data.secure_url;
}