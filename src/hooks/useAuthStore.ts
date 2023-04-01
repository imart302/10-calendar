import { useSelector } from "react-redux";
import { startRenewToken } from "../store/auth/thunks/startRenewToken";
import store, { RootState } from "../store/store";
import { setModalState } from "../store/ui/uiSlice";


export const useAuthStore = () => {

  const auth = useSelector((state: RootState) => state.auth );
  const dispatch = store.dispatch;
  
  const checkAuthToken = async () => {
    const xToken = localStorage.getItem('x-token');

    if(xToken){
      dispatch(startRenewToken());
    }
  }

  return {
    auth,
    checkAuthToken,
  }
};