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
    
            setJwt(true);
            setState({ loading: false, error: false }); // ✅ loading en false
            window.location.href="/ConfirmeCode"
          })
          .catch(() => {
            setState({ loading: false, error: true });
          });
      }, [navigate]);



       const logiVeirfyCode = useCallback(({ code}) => {
        setState({ loading: true, error: false });
        Httpclient.LoginVerifyCode({ code })
          .then((index) => {
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
        logiVeirfyCode,
        isLogin:Boolean(jwt),
        isLoading:state.loading,
        isError:state.error,
    }
}

export default  UseUsers