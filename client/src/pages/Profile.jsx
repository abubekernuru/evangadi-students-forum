import {useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateStart, updateSuccess, updateFailure } from '../redux/userSlice.js';

function Profile() {
    const {currentUser, loading, error} = useSelector((state)=>state.user);
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({});
    const [imageUploading, setImageUploading] = useState(false);
    const [localPreview, setLocalPreview] = useState(null);
    const [updateSuccessful, setUpdateSuccessful] = useState(false);
    const dispatch = useDispatch();

    // image Upload functionality
    const uploadImage = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "profile_preset_2"); 
        data.append("cloud_name", "dv8q3oyfj");

        if(file.size > 7000000){
            alert("File size exceeds 7MB. Please choose a smaller file.");
            return;
        }
        if(!file.type.startsWith("image/")){
            alert("Please select a valid image file.");
            return;
        }
        try {
            setImageUploading(true);
            const res = await fetch("https://api.cloudinary.com/v1_1/dv8q3oyfj/image/upload", {
                method: "POST",
                body: data
            });
            const json = await res.json();
            console.log(json.secure_url);
            setImageUploading(false);
            return json.secure_url;
        } catch (error) {
            console.log(error)
            setImageUploading(false);
        }
    }

    // image change handler
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if(!file) return;
        // For local preview
        const previewUrl = URL.createObjectURL(file);
        setLocalPreview(previewUrl);
        // Upload to cloudinary
        const imageUrl = await uploadImage(file);
        setFormData({...formData, avatar: imageUrl});   
        // Free up memory
        URL.revokeObjectURL(file);
    };

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            dispatch(updateStart());
            setUpdateSuccessful(false);
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if(!res.ok){
                dispatch(updateFailure(data.message || "Update failed"));
                return;
            }
            dispatch(updateSuccess(data));
            setUpdateSuccessful(true);
        } catch (error) {
            console.log(error)
            dispatch(updateFailure(error.message || "Update failed"));
            setUpdateSuccessful(false);
        }
    }
    const handleChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value});
    }
return (
    <div className='flex flex-col bg-white p-10 m-5 shadow-xl max-w-lg mx-auto rounded-lg'>      
        <h2 className='text-xl font-bold mb-3 text-center text-gray-800'>Update Profile</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input 
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleImageChange}
            />
            <img
                src={localPreview || formData.avatar || currentUser.avatar} 
                alt="profile-picture" 
                className="h-20 w-20 rounded-full object-cover mx-auto cursor-pointer mb-3" 
                onClick={()=>fileInputRef.current.click()}

            />
            <p className='text-center text-blue-500'>           {imageUploading ? "Uploading Image..." : ""}
            </p>
            <input 
                className='border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
                type="email" 
                placeholder='Email' 
                id='email' 
                required
                defaultValue={currentUser.email}
                onChange={(e)=>handleChange(e)}
            />
            {/* Name Fields Row */}
            <div className='flex gap-4'>
                <input 
                className='border border-gray-300 rounded-md p-3 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500' 
                type="text" 
                placeholder='First Name' 
                id='firstName' 
                required
                defaultValue={currentUser.firstName}
                onChange={(e)=>handleChange(e)}
                />
                <input 
                className='border border-gray-300 rounded-md p-3 w-1/2 focus:outline-none focus:ring-1 focus:ring-blue-500' 
                type="text" 
                placeholder='Last Name' 
                id='lastName'
                required
                defaultValue={currentUser.lastName}
                onChange={(e)=>handleChange(e)}
                />
            </div>
            <input 
                className='border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
                type="text" 
                placeholder='Username' 
                id='username' 
                required
                defaultValue={currentUser.username}
                onChange={(e)=>handleChange(e)}
            />
            <input 
                className='border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500' 
                type="password" 
                placeholder='Password' 
                id='password'
                onChange={(e)=>handleChange(e)}
            />
            <button type='submit' className='bg-blue-600 text-white py-3 rounded-md font-semibold hover:opacity-95 transition-colors mt-2 text-centern cursor-pointer'>
            {loading ? "Updating..." : "Update"}
            </button>
            {updateSuccessful && <p className='text-green-700 text-sm text-center mt-2'>
                Profile updated successfully!
            </p>}
            {error && <p className='text-red-500 text-sm text-center mt-2'>
                {error}
            </p>}
        </form>
    </div>
    );
}

export default Profile