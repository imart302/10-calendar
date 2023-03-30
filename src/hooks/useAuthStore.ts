import { useSelector } from "react-redux";
import store, { RootState } from "../store/store";
import { setModalState } from "../store/ui/uiSlice";


export const useAuthStore = () => {

  const auth = useSelector((state: RootState) => state.auth );
  
  return {
    auth,
  }
};