import React, { Suspense, useEffect } from "react"
import Breadcrumbs from "../../../ui/Breadcrumbs"
import { useParams } from "react-router"
import Layout from "../../dashboard/layout"
import { useDispatch, useSelector } from "react-redux"
import ActionsUsers from "../../../Actions/ActionsUsers"
import { InvoicesTableSkeleton } from "../../../ui/skeleton"
import Error from "../../../ui/Error"

const UpadateUsers =() =>{
    const dispatch =  useDispatch()
    const { id } = useParams();
    const  {PostUserByID} = ActionsUsers()
    const { userById,LoadingUser,userError } = useSelector((state) => state.users);
    const {PostUsersRole} = ActionsUsers()
    const { accessToken} = useSelector(
        (state) => state.Refrestoken
      );
  
    useEffect(() => {
      const fetch = () => {
        PostUsersRole({token:accessToken});
      };
      fetch();
  }, [id]);
  
  
    useEffect(() => {
        PostUserByID({id,token:accessToken}); // asegúrate de que esto sea un thunk
  }, [dispatch]);


  const LazyTable = React.lazy(() => import("../../../ui/users/edit-form"));

   const fillContent =() =>{
    if(LoadingUser){
      return   <InvoicesTableSkeleton />
    }
    if(userError){
        return <Error />
    }
    
    return        <Suspense  fallback={<InvoicesTableSkeleton />}>
                   <LazyTable  users={userById}  />
                </Suspense>
   }



    return <>   
            <Layout>
                <main>
                <Breadcrumbs
                    breadcrumbs={[
                    { label: 'Usuarios', href: '/dashboard/users' },
                    {
                        label: 'Actualizar Usuario',
                        href: `/dashboard/users/${id}/edit`,
                        active: true,},
                    ]}
                />
                </main>
                 {fillContent()}
            </Layout>
        </>

}

export default UpadateUsers