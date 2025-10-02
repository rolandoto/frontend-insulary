import { useDispatch } from "react-redux";
import { fetchRamosStart, fetchRamosSuccess, fetchRamosFailure, fetchAmparosSuccess, fetchAmparosFailure, fetchPagesStart, fetchPagesSuccess, fetchPagesFailure, postRamosStart, postRamosSuccess, postRamosFailure, setRamosFilter, fetchRamosByIdStart, fetchRamosByIdSuccess, fetchRamosByIdFailure } from "../reducers/ApiRamos";
import Httpclient from "../Httpclient/page";

const ActionsRamos = () => {
    const dispatch = useDispatch();

    const fetchRamos = async ({query, token}) => {
        dispatch(fetchRamosStart());
        try {
            const data = await Httpclient.fetchRamos({ query, token });
            if(data){
                dispatch(fetchRamosSuccess(data));
            } 
            } catch (error) {
            dispatch(fetchRamosFailure("Failed to fetch Ramos"));
        }
    };

     const fetchAmparos = async ({query, token}) => {
        dispatch(fetchRamosStart());
        try {
            const data = await Httpclient.fetchAmparos({ query, token });
         
            if(data){
                dispatch(fetchAmparosSuccess(data));
             
            } 
            } catch (error) {
            dispatch(fetchAmparosFailure("Failed to fetch Amparos"));
        }
    };

     const fetchPostRamos = async ({query, token,currentPage}) => {
        dispatch(postRamosStart());
        try {
            const data = await Httpclient.PostRamos({query, token,currentPage})
            const response = await Httpclient.PostRamosFilter({query,currentPage,token})
            if(data){   
                dispatch(postRamosSuccess(data))
                 dispatch(setRamosFilter(response))
            }
        } catch (error) {
            dispatch(postRamosFailure("Failed to fetch Ramos"));
        }
        
    };



    const PostAmparosTotalPages =async({query,token}) =>{
            dispatch(fetchPagesStart())
            try {
                const response =   await Httpclient.PostRamosTotalPage({query,token})
            
                if(response){
                    dispatch(fetchPagesSuccess(response)) 
                }else{
                    dispatch(fetchPagesFailure("no found"))       
                }
            } catch (error) {
                dispatch(fetchPagesFailure("no found"))      
            }
    }



      const PostRamosById = async ({ id, token }) => {
      
            dispatch(fetchRamosByIdStart());
            try {
                const response = await Httpclient.fetchRamosByID({ id, token });
              
                if (response)   {
                dispatch(fetchRamosByIdSuccess(response));
                } else {
                dispatch(fetchRamosByIdFailure("no found"));
                }
            } catch (error) {
                dispatch(fetchRamosByIdFailure("no found"));
            }
    };

    return {
        fetchRamos,
        fetchAmparos,
        fetchPostRamos,
        PostAmparosTotalPages,
        PostRamosById
    };

}

export default ActionsRamos;