import { useDispatch } from "react-redux";
import { fetchRamosStart, fetchRamosSuccess, fetchRamosFailure, fetchAmparosStart, fetchAmparosSuccess, fetchAmparosFailure } from "../reducers/ApiRamos";
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
        dispatch(fetchAmparosStart());
        try {
            const data = await Httpclient.fetchAmparos({ query, token });

            if(data){
                dispatch(fetchAmparosSuccess(data));
            } 
            } catch (error) {
            dispatch(fetchAmparosFailure("Failed to fetch Amparos"));
        }
    };

    return {
        fetchRamos,
        fetchAmparos
    };

}

export default ActionsRamos;