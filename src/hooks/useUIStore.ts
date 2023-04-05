import { useSelector } from 'react-redux';
import { setModalState } from '../store/ui/uiSlice';
import { RootState, store } from '@/store';

export const useUIStore = () => {
  const isDateModalOpen = useSelector((state: RootState) => {
    return state.ui.isModalOpen;
  });

  const dispatch = store.dispatch;

  const openDateModal = () => {
    dispatch(setModalState(true));
  };

  const closeDateModal = () => {
    dispatch(setModalState(false));
  };

  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
  };
};
