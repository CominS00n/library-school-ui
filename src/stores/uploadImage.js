import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { storage } from './firebase'

let uploadImagePath = 'folder/myImage.png'
let imageURL = ''

export function uploadImage(image) {
  const fileName = image.name
  const storageRef = ref(storage, `folder/${fileName}`)

  return uploadBytes(storageRef, image).then((snapshot) => {
    console.log('Upload Successful')
    uploadImagePath = snapshot.metadata.fullPath
    console.log(uploadImagePath)
    return getDownloadURL(ref(storage, uploadImagePath)).then((download_url) => {
      imageURL = download_url
      return imageURL
    })
  })
}
