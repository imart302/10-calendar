import { uiSlice } from '../../../src/store';
import { initialState } from '../../fixtures/uiSlice';
import { setModalState } from '../../../src/store';

describe('Test on uiSlice', () => {
  it('Should set the initial state', () => {

    expect(uiSlice.getInitialState()).toEqual(initialState);

  });


  it('should change the ui.isModalOpen to true', () => {

    const afterState = uiSlice.reducer(initialState, setModalState(true));

    expect(afterState.isModalOpen).toEqual(true);

  });
});