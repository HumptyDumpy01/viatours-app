// INFO: install axios
import axios from 'axios';

if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
  throw new Error('Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env file');
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  // @ts-ignore
  // IMPORTANT: just create an upload preset in cloudinary and use it here
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

  const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
  return response.data.secure_url;
}

/* example of usage

INFO: INSIDE A COMPONENT
 ...
const fileInputRef = useRef<HTMLInputElement>(null);
const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

 const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files).slice(0, 3); // Limit to 3 files
      setSelectedFiles(filesArray);
    }
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
  ....
  ....
  ...

    const imageUrls = await Promise.all(selectedFiles.map(uploadImage));
    console.log(`Executing imageUrls: `, imageUrls);
    const formResults = {
    ....
      images: imageUrls // Use Cloudinary URLs
    };

    // @ts-ignore
    const submitForm = await submitTourComment(formResults);

INFO: YOUR BACKEND API ENDPOINT

export async function submitTourComment({..... images }: submitTourComment) {

TASK: receive the images from the client and save them in the database ...

...
}
* */