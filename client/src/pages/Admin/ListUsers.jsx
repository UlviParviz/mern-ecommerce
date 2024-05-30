import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../../layouts/Site/Loader";
import { MDBDataTable } from "mdbreact";
import { Link, useParams } from "react-router-dom";
import { FaImage, FaPencil, FaTrash } from "react-icons/fa6";
import MetaData from "../../layouts/Site/MetaData";
import AdminLayout from "../../layouts/Admin/AdminLayout";
import { useDeleteUserMutation, useGetAdminUsersQuery } from "../../redux/api/userApi";

const ListUsers = () => {

  const { data, isLoading, error } = useGetAdminUsersQuery();

  const [
    deleteUser,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteUserMutation();


  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("User Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteUserHandler = (id) => {
    deleteUser(id);
  };

  const setUsers = () => {
    const users = {
      columns: [
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.users?.forEach((user) => {
      users.rows.push({
        email: `${user?.email.substring(0,16)}...`,
        role: `${user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) }`,
        actions: (
          <div className='flex justify-center flex-col md:flex-row gap-1'>
            <div className='flex justify-center w-full'>
            <Link to={`/admin/users/${user?._id}`} className="btn btn-outline-primary w-full flex justify-center">
              <FaPencil />
            </Link>
            </div>
            <div className='flex justify-center w-full'>
            <button disabled={isDeleteLoading}  className="btn btn-outline-danger w-full flex justify-center" onClick={() => deleteUserHandler(user?._id)}>
              <FaTrash />
            </button>
            </div>
          </div>
        ),
      });
    });

    return users;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"All Users"} />
      <h1 className="my-5 text-center font-bold text-2xl">
        {data?.users?.length} Users
      </h1>
      <div className="table-responsive">
        <MDBDataTable
          data={setUsers()}
          className="px-3"
          busered
          hover
          displayEntries={false}
        />
      </div>
    </AdminLayout>
  );
};

export default ListUsers;
