import { useDispatch } from "react-redux";
import Httpclient from "../Httpclient/page"
import { fetchCasosFailure, fetchCasosFilterSuccess, fetchCasosSuccess, fetchCasostStart, fetchPagesFailure, fetchPagesStart, fetchPagesSuccess } from "../reducers/ApiCasos";

const ActionsCasos =() =>{

    const dispatch =  useDispatch()
   
    const PostCasos =async({query,currentPage,token}) =>{
        dispatch(fetchCasostStart())
        try {
           const response =   await Httpclient.fetchCasos({query,currentPage,token})
           const responseCasos =   await Httpclient.fetchCasosFilter({query,currentPage,token})

           if(response){
            dispatch(fetchCasosSuccess(response)) 
            dispatch(fetchCasosFilterSuccess(responseCasos)) 
           }else{
            dispatch(fetchCasosFailure("no found"))       
           }
        } catch (error) {
            dispatch(fetchCasosFailure("no found"))
                   
        }
    }

    const PostCasostPages =async({query,token}) =>{
      
        dispatch(fetchPagesStart())
        try {
           const response =   await Httpclient.fetchCasosFilterpage({query,token})
            
           if(response){
            dispatch(fetchPagesSuccess(response)) 
           }else{
            dispatch(fetchPagesFailure("no found"))
              
           }
        } catch (error) {
           
            dispatch(fetchPagesFailure("no found"))          
        }
    }

    return {
        PostCasos,
        PostCasostPages
    }

}

export default ActionsCasos