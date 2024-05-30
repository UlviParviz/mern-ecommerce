import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import MetaData from "../../layouts/Site/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApi";
import toast from "react-hot-toast";
import Loader from '../../layouts/Site/Loader'

const UpdateUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
  
    const navigate = useNavigate();
    const params = useParams();
  
    const { data } = useGetUserDetailsQuery(params?.id);
  
    const [updateUser, { error, isSuccess, isLoading }] = useUpdateUserMutation();
  
    useEffect(() => {
      if (data?.user) {
        setName(data?.user?.name);
        setEmail(data?.user?.email);
        setRole(data?.user?.role);
      }
    }, [data]);
  
    useEffect(() => {
      if (error) {
        toast.error(error?.data?.message);
      }
  
      if (isSuccess) {
        toast.success("User Updated");
        navigate("/admin/users");
      }
    }, [error, isSuccess]);
  
    const submitHandler = (e) => {
      e.preventDefault();
  
      const userData = {
        name,
        email,
        role,
      };
  
      updateUser({ id: params?.id, body: userData });
    };

  return (
    <AdminLayout>
      <MetaData title={"Update"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="" onSubmit={submitHandler}>
            <h2 className="mb-4 text-2xl font-bold">Update User</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Name
              </label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role_field" className="form-label">
                Role
              </label>
              <select
                id="role_field"
                className="form-select"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>user</option>
                <option>admin</option>
              </select>
            </div>
            <button disabled={isLoading} className="mt-2 rounded-lg relative flex h-[50px] w-full items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-lg before:bg-red-500 before:duration-500 before:ease-out hover:shadow-red-600 hover:before:h-56 hover:before:w-full">
              <span className="relative z-10">{isLoading ? '...' : "Update User"}</span>
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateUser;
