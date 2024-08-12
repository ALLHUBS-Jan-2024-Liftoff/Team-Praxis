import { useState } from 'react';
import { uploadImage } from '../service/ImageService';
import { useNavigate } from 'react-router-dom';

export default function AddImage() {
    let navigate = useNavigate();

    const [image, setImage] = useState(null); // documentation says to use useState(null) not sure why?
    const [uploadStatus, setUploadStatus] = useState(''); // to get more details of upload status

    // target.files is specfically for file types
    const handleImage = (e) => setImage(e.target.files[0]);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await uploadImage(image);
            setUploadStatus(result);
            navigate(`/user`);
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploadStatus('Failed to upload');
        }
    };

    return (
        <div className="sm:col-span-3">
            <h1 className="text-base font-semibold leading-7 flex justify-center text-2xl">
                Upload a picture!
            </h1>
            <form onSubmit={onSubmit}>
                <input type="file" onChange={handleImage} />
                <div>
                    <button
                        type="submit"
                        className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </div>
    );
}
