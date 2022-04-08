import firebase from "firebase/app";
import "firebase/storage";

import generateRandomString from "./random.string.gen";

async function uploadImageToFirebaseStorage(path: string, image: File) {
  if (image.type.match("image.*")) {
    const arr = image.name.split(".");
    const imageExtension = arr[arr.length - 1];
    const generateImageName = generateRandomString(10) + "." + imageExtension;
    const storage = firebase.storage();
    await storage.ref(`${path}/${generateImageName}`).put(image);
    const url = await storage
      .ref(path)
      .child(generateImageName)
      .getDownloadURL();
    return url;
  } else {
    return "";
  }
}

export default uploadImageToFirebaseStorage;
