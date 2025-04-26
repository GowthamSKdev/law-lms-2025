import { useEffect } from "react";
import { GetAllUsers } from "../../service/api";
import { useLoaderData } from "react-router";
import PageHeader from "../../components/PageHeader";

function UserManagement() {
  const users = useLoaderData();
  console.log("Users", users);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await GetAllUsers();
  //       console.log(response);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //     }
  //   };
  //   fetchUsers();
  // }, []);
  return (
    <>
      <PageHeader title={"User Management"} />
      <div class="overflow-auto p-4">
        <table class="min-w-full divide-y divide-gray-200 shadow-md border border-gray-300 rounded-lg text-sm">
          <thead class="bg-gray-100">
            <tr className="">
              <th class="px-6 py-4 font-medium">S.No</th>
              <th class="px-6 py-4 font-medium">Username</th>
              <th class="px-6 py-4 font-medium">Email</th>
              <th class="px-6 py-4 font-medium">Date of Birth</th>
              <th class="px-6 py-4 font-medium">Gender</th>
              <th class="px-6 py-4 font-medium">Role</th>
              <th class="px-6 py-4 font-medium">Approved</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td class="px-6 py-4">{index + 1}</td>
                  <td class="px-6 py-4">{user.username}</td>
                  <td class="px-6 py-4">{user.email}</td>
                  <td class="px-6 py-4">{user.dob}</td>
                  <td class="px-6 py-4">{user.gender}</td>
                  <td class="px-6 py-4">{user.role}</td>
                  <td class="px-6 py-4">
                    {user.isApproved ? "Approved" : "Pending"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>no Users</tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserManagement;
