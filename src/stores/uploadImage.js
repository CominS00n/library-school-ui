import { ref, uploadBytes } from '@firebase/storage'
import { storage } from './firebase'

let uploadImagePath = 'folder/myImage.png'

export function uploadImage(image) {
  const fileName = image.name
  const storageRef = ref(storage, `folder/${fileName}`)

  return uploadBytes(storageRef, image).then((snapshot) => {
    console.log('Upload Successful')
    uploadImagePath = snapshot.metadata.fullPath
    return uploadImagePath
  })
}
