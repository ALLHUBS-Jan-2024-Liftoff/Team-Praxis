
import { useState } from 'react';
import { uploadImage } from '../service/ImageService';
import { getCurrentUser } from '../service/UserService';


export default function AddImage(){
    const [image, setImage] = useState(null)  // documentation says to use useState(null) not sure why?
    const [uploadStatus, setUploadStatus] = useState('');  // to get more details of upload status

    const handleImage = e => {
        console.log(e.target.files) // i want to see what its outputting
        setImage(e.target.files[0]);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await uploadImage(image);
            setUploadStatus(result);
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus('Failed to upload');
        }
    }
    

    return (
        <div className="sm:col-span-3">
        <form onSubmit={onSubmit}>
            <input type="file" onChange={handleImage} />
            <div>
            <button 
            type="submit"
            className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">
                Upload
                </button>
            </div>
        </form>
    </div>
    )
}