import { ref, uploadBytes } from '@firebase/storage'
import { storage } from './firebase'

const uploadImagePath = 'folder/myImage.png'

export function uploadImage(image) {
  const fileName = image.name
  const storageRef = ref(storage, `folder/${fileName}`)
  // console.log(image)

  uploadBytes(storageRef, image).then((snapshot) => {
    
    console.log('Upload Successful')
    uploadImagePath = snapshot.metadata.fullPath
  })
}
