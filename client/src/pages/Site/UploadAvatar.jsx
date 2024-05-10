import React, { useEffect, useState } from 'react'
import UserLayout from '../../layouts/Site/UserLayout'
import { useNavigate } from 'react-router-dom'
import { useUploadAvatarMutation } from '../../redux/api/userApi'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const UploadAvatar = () => {

    const {user} = useSelector((state) => state.auth)

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview ] = useState(
        user?.avatar ? user?.avatar?.url : "../../assets/images/default_avatar.jpg"
    )

    const navigate = useNavigate()

    const [uploadAvatar, {isLoading, error, isSuccess}] = useUploadAvatarMutation()

    useEffect(() => {

    
        if (error) {
          toast.error(error?.data?.message);
        }
    
        if (isSuccess) {
          toast.success("Avatar Uploaded");
          navigate("/me/profile");
        }
      }, [error, isSuccess]);
    
      const submitHandler = (e) => {
        e.preventDefault();
    
        const userData = {
            avatar
        };
    
        uploadAvatar(userData);
      };

      const onChange = (e) => {

        const reader = new FileReader()

        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }

        reader.readAsDataURL(e.target.files[0])
      }

  return (
    <UserLayout>
    <div className="flex justify-center">
  <div className="w-full lg:w-8/12">
    <form
      className="shadow rounded bg-white p-6"
      onSubmit={submitHandler}
    >
      <h2 className="text-xl mb-4">Upload Avatar</h2>

      <div className="mb-3 flex items-center">
        <div className="me-3">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
            <img src={avatarPreview} className="h-full w-full object-cover" alt="image" />
          </div>
        </div>
        <div className="flex-1">
          <label className="block mb-2" htmlFor="customFile">
            Choose Avatar
          </label>
          <input
            type="file"
            name="avatar"
            className="block w-full py-2 px-3 border border-gray-300 rounded-sm"
            id="customFile"
            accept="images/*"
            onChange={onChange}
          />
        </div>
      </div>
      <div className='flex justify-center items-center'>
      <button disabled={isLoading} className="rounded-md group relative min-h-[35px] w-[50%] overflow-hidden border border-red-500 bg-white text-black shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:bottom-0 after:right-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white hover:before:h-full hover:after:h-full">
                  <span className="top-0 flex h-full w-full items-center justify-center before:absolute before:bottom-0 before:left-1/4 before:z-0 before:h-0 before:w-1/4 before:bg-red-500 before:duration-500 after:absolute after:right-1/4 after:top-0 after:z-0 after:h-0 after:w-1/4 after:bg-red-500 after:duration-500 hover:text-white group-hover:before:h-full group-hover:after:h-full"></span>
                  <span className="absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full items-center justify-center group-hover:text-white">{isLoading ? "Uploading..." : "Upload Avatar"}</span>
                </button>
      </div>
    </form>
  </div>
</div>
    </UserLayout>

  )
}

export default UploadAvatar