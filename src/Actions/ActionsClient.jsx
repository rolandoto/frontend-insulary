import { useDispatch } from "react-redux";
import Httpclient from "../Httpclient/page"
import { fetchCasesbyIDFailure, fetchCasesbyIDStart, fetchCasesbyIDSuccess, fetchCasosDocumentFailure, fetchCasosDocumentStart, fetchCasosDocumentSuccess, fetchClientByIdFailure, fetchClientByIdStart, fetchClientByIdSuccess, fetchClientsFailure, fetchClientsFilterSuccess, fetchClientsStart, fetchClientsSuccess, fetchDocumentFailure, fetchDocumentStart, fetchDocumentSuccess, fetchEstadosCasosFailure, fetchEstadosCasosStart, fetchEstadosCasosSuccess, fetchPagesFailure, fetchPagesStart, fetchPagesSuccess } from "../reducers/ApiClient";

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



    const PostCasesById =async({id,token}) =>{
        dispatch(fetchCasesbyIDStart())
        try {
           
           const response =   await Httpclient.fetchCasesbyID({id,token})

           if(response){
                    dispatch(fetchCasesbyIDSuccess(response)) 
           }else{
                    dispatch(fetchCasesbyIDFailure("no found"))       
           }
        } catch (error) {
            dispatch(fetchCasesbyIDFailure("no found"))                   
        }
    }



     const PostCasosEstados =async({id,token}) =>{ 
        dispatch(fetchEstadosCasosStart())
        try {
           
           const response =   await Httpclient.FetchPosStateCasos({id,token})

           if(response){
                    dispatch(fetchEstadosCasosSuccess(response)) 
           }else{
                    dispatch(fetchEstadosCasosFailure("no found"))       
           }
        } catch (error) {
            dispatch(fetchCasesbyIDFailure("no found"))                   
        }
    }


     const PostCasosDocument =async({id,token}) =>{ 
        dispatch(fetchCasosDocumentStart())
        try {
           
           const response =   await Httpclient.fetchCasosDocument({id,token})
      
           if(response){
                    dispatch(fetchCasosDocumentSuccess(response)) 
           }else{
                    dispatch(fetchCasosDocumentFailure("no found"))       
           }
        } catch (error) {
            dispatch(fetchCasosDocumentFailure("no found"))                   
        }
    }



     const PostDocument =async({id,token}) =>{ 
        
        dispatch(fetchDocumentStart())
        try {
           
           const response =   await Httpclient.fetchDocument({id,token})
      
           if(response){
                    dispatch(fetchDocumentSuccess(response)) 
           }else{
                    dispatch(fetchDocumentFailure("no found"))       
           }
        } catch (error) {
            dispatch(fetchDocumentFailure("no found"))                   
        }
    }

    return {PostClient,
        PostClientPages,
        PostClientById,
        PostCasesById,
        PostCasosEstados,
        PostCasosDocument,
        PostDocument
    }

}

export default ActionsClient