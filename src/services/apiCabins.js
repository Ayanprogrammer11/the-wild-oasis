import supabase from "./supabase";
import { v4 as uuidv4 } from "uuid";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  return data;
}

export async function createCabin(cabin) {
  try {
    // Destructure the image from the cabin object
    const { image, ...cabinData } = cabin;

    // Generate a unique filename for the image
    const imageName = `${uuidv4()}-${image.name}`;
    const imagePath = `${imageName}`;

    // Upload the image to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("cabins")
      .upload(imagePath, image);

    if (uploadError) {
      throw new Error(`Error uploading image: ${uploadError.message}`);
    }

    // Get the public URL of the uploaded image
    const { data: urlData } = await supabase.storage
      .from("cabins")
      .getPublicUrl(imagePath);

    // Add the image URL to the cabin data
    const cabinWithImage = {
      ...cabinData,
      image: urlData.publicUrl,
    };

    // Insert the cabin data into the cabins table
    const { data, error } = await supabase
      .from("cabins")
      .insert(cabinWithImage)
      .select();

    if (error) {
      throw new Error(`Error inserting cabin data: ${error.message}`);
    }

    return data[0];
  } catch (error) {
    console.error("Error in createCabin:", error);
    throw error;
  }
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted!");
  }

  return data;
}
