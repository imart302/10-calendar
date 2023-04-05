import { setModalState } from '../store/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '@/store';

export const useUIStore = () => {
  const isDateModalOpen = useAppSelector((state) => state.ui.isModalOpen);
  const dispatch = useAppDispatch();

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
