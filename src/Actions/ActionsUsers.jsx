import { useDispatch } from "react-redux";
import Httpclient from "../Httpclient/page"
import { fetchPagesFailure, fetchPagesStart, fetchPagesSuccess, fetchRolesFailure, fetchRolesStart, fetchRolesSuccess, fetchUserByIdFailure, fetchUserByIdStart, fetchUserByIdSuccess, fetchUsersFailure, fetchUsersFilterSuccess, fetchUsersStart, fetchUsersSuccess } from "../reducers/ApiUsers";

const ActionsUsers =() =>{

    const dispatch =  useDispatch()
   
    const PostUsers =async({query, currentPage,token}) =>{

        dispatch(fetchUsersStart())
        try {
           const response =   await Httpclient.fetchUsers({query, currentPage,token})
        
           if(response){
            dispatch(fetchUsersSuccess(response)) 
          
           }else{
            dispatch(fetchUsersFailure("no found"))       
           }
        } catch (error) {
            dispatch(fetchUsersFailure("no found"))         
        }
    }

    const PostUsersPages =async({query,token}) =>{
        dispatch(fetchPagesStart())
        try {
           const response =   await Httpclient.fetchUserTotalPages({query,token})

           if(response){
                    dispatch(fetchPagesSuccess(response)) 
           }else{
                    dispatch(fetchPagesFailure("no found"))       
           }
        } catch (error) {
            dispatch(fetchPagesFailure("no found"))                   
        }
    }


    const PostUsersRole=async({token}) =>{
        dispatch(fetchRolesStart())
        try {
           const response =   await Httpclient.fetchUsersRoles({token})

           if(response){
                    dispatch(fetchRolesSuccess(response)) 
           }else{
                    dispatch(fetchRolesFailure("no found"))       
           }
        } catch (error) {
      
            dispatch(fetchPagesFailure("no found"))                   
        }
    }


    const PostUserByID=async({id,token}) =>{
        dispatch(fetchUserByIdStart())
        try {
           const response =   await Httpclient.fetchUsersByID({id,token})

           if(response){
                    dispatch(fetchUserByIdSuccess(response)) 
           }else{
                    dispatch(fetchUserByIdFailure("no found"))       
           }
        } catch (error) {
      
            dispatch(fetchUserByIdFailure("no found"))                   
        }
    }

    return {
        PostUsers,
        PostUsersPages,
        PostUsersRole,
        PostUserByID
    }

}

export default ActionsUsers