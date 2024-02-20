import { storage } from './firebase'
import { ref, getDownloadURL } from '@firebase/storage'

let imageURL = ''

export function getImageURL(url) {
  return getDownloadURL(ref(storage, url)).then((download_url) => {
    imageURL = download_url
    return imageURL;
  });
}
