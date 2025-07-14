import { useDispatch } from "react-redux";
import Httpclient from "../Httpclient/page"
import { fetchDashboardFailure, fetchDashboardStart, fetchDashboardSuccess } from "../reducers/ApiDashboard";

const ActionsDashboard =() =>{

    const dispatch =  useDispatch()

    const PostCasosDashboard =async({token}) =>{
        dispatch(fetchDashboardStart())
   
        try {
           const response =   await Httpclient.Alldashboard({token})
 
           if(response){
            dispatch(fetchDashboardSuccess(response))
           }else{
            dispatch(fetchDashboardFailure("no found"))       
           }
        } catch (error) {
            dispatch(fetchDashboardFailure("no found"))
                   
        }
    }

    return {
        PostCasosDashboard
    }

}

export default ActionsDashboard