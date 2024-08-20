import supabase, { supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export async function getCabins() {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded!");
  }

  return data;
}

// export async function createEditCabin(newCabin, id) {
//   console.log(newCabin, id ? "Edit mode" : "Create mode");
//   const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

//   const imageName = `${Math.random()}--${newCabin?.image?.name}`.replaceAll(
//     "/",
//     ""
//   );
//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

//   // 1) Create/edit Cabin
//   let query = supabase.from("cabins");

//   // A) CREATE
//   if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

//   // B) EDIT

//   if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

//   const { data, error } = query.select().single();

//   if (error) {
//     console.error(error);
//     throw new Error("Error updating Cabin!!");
//   }

//   // 2) Upload Image
//   const { error: storageError } = await supabase.storage
//     .from("cabins")
//     .upload(imageName, newCabin.image);

//   // 3) Remove the cabin if the image upload was unsuccessful
//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data.id);
//     console.error(error);
//     throw new Error("Cabin could not be created due to image upload error!");
//   }
// }

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id ? "Edit mode" : "Create mode");
  const hasImagePath = newCabin?.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}--${newCabin?.image?.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  // 1) Create/edit Cabin
  const cabinData = { ...newCabin, image: imagePath };

  let result;
  if (id) {
    // EDIT
    result = await supabase
      .from("cabins")
      .update(cabinData)
      .eq("id", id)
      .select();
  } else {
    // CREATE
    result = await supabase
      .from("cabins")
      .insert([cabinData])
      .select()
      .single();
  }

  const { data, error } = result;

  if (error) {
    console.error(error);
    throw new Error("Error updating Cabin!");
  }

  // 2) Upload Image
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabins")
      .upload(imageName, newCabin.image);

    // 3) Remove the cabin if the image upload was unsuccessful
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error("Cabin could not be created due to image upload error!");
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted!");
  }

  return data;
}
