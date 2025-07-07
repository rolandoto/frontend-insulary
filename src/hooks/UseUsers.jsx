import  { useCallback, useContext, useState } from "react"
import Httpclient from '../Httpclient/page';
import { useNavigate } from "react-router";

const UseUsers =() =>{
    const [jwt,setJwt] =useState(false)
    const [state,setState] = useState({loading:false,error:false})
    const navigate = useNavigate();

    const login = useCallback(({ email, password }) => {
        setState({ loading: true, error: false });
      
        Httpclient.LoginUser({ email, password })
          .then((index) => {
            console.log(index)
            setJwt(true);
            setState({ loading: false, error: false }); // ✅ loading en false
           window.location.reload()
          })
          .catch(() => {
            setState({ loading: false, error: true });
          });
      }, [navigate]);
    return  {
        login,
        isLogin:Boolean(jwt),
        isLoading:state.loading,
        isError:state.error,
    }

}

export default  UseUsers