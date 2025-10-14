import { useDispatch } from "react-redux";
import Httpclient from "../Httpclient/page"
import { fetchAmparosByIdFailure, fetchAmparosByIdStart, fetchAmparosByIdSuccess, fetchAmparosFailure, fetchAmparosStart, fetchAmparosSuccess,fetchPagesFailure ,fetchPagesStart,fetchPagesSuccess, setAmparosFilter} from "../reducers/apiAmparos";

const ActionsAmparos =() =>{

    const dispatch =  useDispatch()
   
    const PostBranches =async({query,currentPage,token}) =>{
        dispatch(fetchAmparosStart())
        try {
            const response =   await Httpclient.PostAmparos({query,currentPage,token})
            const responseFilter = await Httpclient.PostAmparosFilter({query,currentPage,token})
            if(response){
                dispatch(fetchAmparosSuccess(response)) 
                dispatch(setAmparosFilter(responseFilter))
            }else{
                dispatch(fetchAmparosFailure("no found"))       
            }
        } catch (error) {
            dispatch(fetchAmparosFailure("no found"))      
        }
    }

     const PostAmparosTotalPages =async({query,token}) =>{
            dispatch(fetchPagesStart())
            try {
               const response =   await Httpclient.PostAmparosTotalPage({query,token})
           
                if(response){
                    dispatch(fetchPagesSuccess(response)) 
                }else{
                    dispatch(fetchPagesFailure("no found"))       
                }
            } catch (error) {
                dispatch(fetchPagesFailure("no found"))      
            }
        }

        const PostAmparosById = async ({ id, token }) => {
            dispatch(fetchAmparosByIdStart());
            try {

                const response = await Httpclient.fetchAmparosByID({ id, token });

                if (response) {
                dispatch(fetchAmparosByIdSuccess(response));
                } else {
                dispatch(fetchAmparosByIdFailure("no found"));
                }
            } catch (error) {
                dispatch(fetchAmparosByIdFailure("no found"));
            }
        };
    
    return {
        PostBranches,
        PostAmparosTotalPages,
        PostAmparosById
    }

}

export default ActionsAmparos