import { useDispatch } from "react-redux";
import Httpclient from "../Httpclient/page"
import { fetchBranchByIdFailure, fetchBranchByIdStart, fetchBranchByIdSuccess, fetchBranchesFailure, fetchBranchesStart, fetchBranchesSuccess, fetchPagesFailure, fetchPagesStart, fetchPagesSuccess, setBranchesFilter } from "../reducers/ApiBranches";

const ActionsBranches =() =>{

    const dispatch =  useDispatch()
   
    const PostBranches =async({query,currentPage,token}) =>{
        dispatch(fetchBranchesStart())
        try {
            const response =   await Httpclient.PostBranches({query,currentPage,token})
            const responseFilter =   await Httpclient.PostBranchesFilter({query,currentPage,token})

            if(response){
                dispatch(fetchBranchesSuccess(response)) 
                dispatch(setBranchesFilter(responseFilter)) 
            }else{
                dispatch(fetchBranchesFailure("no found"))       
            }
        } catch (error) {
            dispatch(fetchBranchesFailure("no found"))      
        }
    }


    const PostBranchesTotalPages =async({query,token}) =>{
        dispatch(fetchPagesStart())
        try {
           const response =   await Httpclient.PostBranchesTotalPage({query,token})

            if(response){
                dispatch(fetchPagesSuccess(response)) 
            }else{
                dispatch(fetchPagesFailure("no found"))       
            }
        } catch (error) {
            dispatch(fetchPagesFailure("no found"))      
        }
    }


    const PostBranchesById =async({id,token}) =>{
        dispatch(fetchBranchByIdStart())
        try {
            const response = await Httpclient.fetchBranchesbyID({id,token})

            if(response){
            dispatch(fetchBranchByIdSuccess(response)) 
            }else{
            dispatch(fetchBranchByIdFailure("no found"))
            }
        } catch (error) {
            
            dispatch(fetchBranchByIdFailure("no found"))          
        }
    }

    return {
        PostBranches,
        PostBranchesTotalPages,
        PostBranchesById
    }

}

export default ActionsBranches