import { startRenewToken } from "../store/auth/thunks/startRenewToken";
import { useAppDispatch, useAppSelector } from "@/store";

export const useAuthStore = () => {

  const auth = useAppSelector((state) => state.auth );
  const dispatch = useAppDispatch();
  
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