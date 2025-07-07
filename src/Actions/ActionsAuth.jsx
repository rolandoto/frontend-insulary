import { useDispatch } from "react-redux";
import Httpclient from "../Httpclient/page"
import { fetchRefreshTokenFailure, fetchRefreshTokenStart, fetchRefreshTokenSuccess } from "../reducers/ApiAuth";

const ActionsAuth =() =>{

    const dispatch =  useDispatch()
   
    const GetRefresToken =async() =>{
        dispatch(fetchRefreshTokenStart())
        try {
           const response =   await Httpclient.GetRefrestToken()
           if(response){
            dispatch(fetchRefreshTokenSuccess(response)) 
           }else{
            dispatch(fetchRefreshTokenFailure("no found"))       
           }
        } catch (error) {
            dispatch(fetchRefreshTokenFailure("no found"))
                   
        }
    }

    return {
        GetRefresToken
    }

}

export default ActionsAuth