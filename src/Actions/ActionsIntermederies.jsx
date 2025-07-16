import { useDispatch } from "react-redux"
import { fetchIntermederiesByIdFailure, fetchIntermederiesByIdStart, fetchIntermederiesByIdSuccess, fetchIntermediariesFailure, fetchIntermediariesStart, fetchIntermediariesSuccess, fetchPagesFailure, fetchPagesStart, fetchPagesSuccess, setIntermediariesFilter } from "../reducers/ApiIntermederies"
import Httpclient from "../Httpclient/page"

const ActionsIntermederies =() =>{

    const dispatch =  useDispatch()

    const PostIntermederies =async({query,currentPage,token}) =>{
            dispatch(fetchIntermediariesStart())
        try {
       
            const response =   await Httpclient.PostIntermderies({query,currentPage,token})
            const responseFilterIntermederies =  await Httpclient.PostIntermderiesFilter({query,currentPage,token})
            
                if(response){
                dispatch(fetchIntermediariesSuccess(response))
                  dispatch(setIntermediariesFilter(responseFilterIntermederies))
                }else{
                dispatch(fetchIntermediariesFailure("no found"))       
                }
        } catch (error) {
            dispatch(fetchIntermediariesFailure("no found"))      
        }
    }


    const PostIntermederiesPages =async({query,token}) =>{
            dispatch(fetchPagesStart())
            try {
               const response = await Httpclient.PostIntermderiesTotalPage({query,token})
               if(response){
                dispatch(fetchPagesSuccess(response)) 
               }else{
                dispatch(fetchPagesFailure("no found"))
               }
            } catch (error) {
               
                dispatch(fetchPagesFailure("no found"))          
            }
    }


     const PostIntermederiesById =async({id,token}) =>{
            dispatch(fetchIntermederiesByIdStart())
            try {
               const response = await Httpclient.fetchIntermederiesbyID({id,token})
               if(response){
                dispatch(fetchIntermederiesByIdSuccess(response)) 
               }else{
                dispatch(fetchIntermederiesByIdFailure("no found"))
               }
            } catch (error) {
               
                dispatch(fetchIntermederiesByIdFailure("no found"))          
            }
    }
    

    return {PostIntermederies,
        PostIntermederiesPages,
        PostIntermederiesById
    }

}

export default ActionsIntermederies