import { useEffect } from "react";
import ActionsUsers from "../../Actions/ActionsUsers";
import { useSelector } from "react-redux";
import { UpdateUsers } from "../customers/buttons";
import userLogo  from "../../../public/customers/evil-rabbit.png"
import { InvoicesTableSkeleton } from "../skeleton";

export default  function Table({query,currentPage}) {

    const {PostUsers,PostUsersPages} = ActionsUsers()
    const {users,loading}= useSelector((state) => state.users)

    const { accessToken} = useSelector(
        (state) => state.Refrestoken
      );
    useEffect(() => {
        const fetch = () => {
            PostUsers({ query,currentPage,token:accessToken});
            PostUsersPages({query,token:accessToken})
        };
        fetch();
    }, [query, currentPage]);

    if(loading)  return  <InvoicesTableSkeleton />
 
  return (
    <div className="mt-6 flow-root">
    <div className="mt-6 flow-root">
      <div className="block w-full align-middle">
        <div className="modern-table-shell p-2 md:pt-0">
          <div className="md:hidden">
            {users?.length ? users?.map((client) => (
              <div
                key={client.id}
                className="modern-mobile-card mb-3 w-full p-4">
                <div className="flex items-center justify-between  border-gray-200  border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <img
                        src={userLogo}
                        className="mr-2 rounded-full"
                        alt={`${client.name}'s profile picture`}
                      />
                      <p>{client.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl  text-green-400  font-medium">
                        {client.name_rol}
                    </p>
                    
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateUsers id={client.id} />
                  </div>
                </div>
              </div>
            )) : (
              <div className="modern-empty-state rounded-xl bg-white">No hay usuarios para mostrar.</div>
            )}
          </div>
          <div className="modern-table-wrapper hidden md:block">
            <table className="modern-table min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-600">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nombre
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tipo perfil
                </th>
               
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {users?.length ? users?.map((user) => (
                <tr
                key={user.id}
                  className="w-full align-middle text-sm">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                    <img
                        src={userLogo}
                        className="mr-2 w-8 rounded-full"
                        alt={`${user.nombre}'s profile picture`}
                      />
                     {user.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                  {user.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-green-400 ">
                  {user.name_rol}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                    <UpdateUsers id={user.id} />
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="modern-empty-state">
                    No hay usuarios para mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
