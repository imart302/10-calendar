import { useSelector } from "react-redux";
import store, { RootState } from "../store/store";
import { setModalState } from "../store/ui/uiSlice";


export const useUIStore = () => {

  const isDateModalOpen = useSelector((state: RootState) => state.ui.isModalOpen );
  const dispatch = store.dispatch;

  const openDateModal = () => {
    dispatch(setModalState(true));
  }

  const closeDateModal = () => {
    dispatch(setModalState(false));
  }

  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
  }
};