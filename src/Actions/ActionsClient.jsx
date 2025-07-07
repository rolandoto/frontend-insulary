import { useDispatch } from "react-redux";
import Httpclient from "../Httpclient/page"
import { fetchClientByIdFailure, fetchClientByIdStart, fetchClientByIdSuccess, fetchClientsFailure, fetchClientsFilterSuccess, fetchClientsStart, fetchClientsSuccess, fetchPagesFailure, fetchPagesStart, fetchPagesSuccess } from "../reducers/ApiClient";

const ActionsClient =() =>{

    const dispatch =  useDispatch()
    
    const PostClient =async({query,currentPage,token}) =>{
        dispatch(fetchClientsStart())
        try {
           const response =   await Httpclient.fetchClients({query,currentPage,token})
           const responseFilterClients  =  await Httpclient.fetchClientsFilter({query,currentPage,token})

           if(response){
                    dispatch(fetchClientsSuccess(response)) 
                    dispatch(fetchClientsFilterSuccess(responseFilterClients)) 
                  
           }else{
                    dispatch(fetchClientsFailure("no found"))       
           }
        } catch (error) {
                    dispatch(fetchClientsFailure("no found"))
                   
        }
    }

    const PostClientPages =async({query,token}) =>{
        dispatch(fetchPagesStart())
        try {
           const response =   await Httpclient.fetchClientFilterpage({query,token})

           if(response){
                    dispatch(fetchPagesSuccess(response)) 
           }else{
                    dispatch(fetchPagesFailure("no found"))       
           }
        } catch (error) {
            dispatch(fetchPagesFailure("no found"))                   
        }
    }

    const PostClientById =async({id,token}) =>{
        dispatch(fetchClientByIdStart())
        try {
           const response =   await Httpclient.fetchClientByID({id,token})

           if(response){
                    dispatch(fetchClientByIdSuccess(response)) 
           }else{
                    dispatch(fetchClientByIdFailure("no found"))       
           }
        } catch (error) {
            dispatch(fetchClientByIdFailure("no found"))                   
        }
    }

    return {PostClient,
        PostClientPages,
        PostClientById
    }

}

export default ActionsClient