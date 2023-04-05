import { calendarApi } from "../../src/api";
import MockAdapter from 'axios-mock-adapter';
import { rest } from 'msw';
import { ApiError, IApiError, IApiErrorHeader } from "../../src/api/ApiErrors";
import { AxiosResponse } from "axios";



describe('Tests on calendarApi axios instance', () => {

  const mock = new MockAdapter(calendarApi);
  mock.onGet('/auth', {});

  it('Should have the defect config', () => {

    expect(calendarApi.defaults.baseURL).toEqual(process.env.VITE_API_URL);

  });

  it('Should have the x-token from the localStorage', async () => {
    const xToken = '1234'
    localStorage.setItem('x-token', xToken);

    let resp: AxiosResponse<any, any> | null = null;
    let derror: IApiError<IApiErrorHeader> | null = null;
    try {
      resp = await calendarApi.get('/auth');
    }
    catch(error) {
      derror = error as IApiError<IApiErrorHeader>;
    }

    if(resp){
      expect(resp.config.headers['x-token']).toEqual(xToken);
    }
    if(derror){
      expect(derror.header.xToken).toEqual(xToken);
    }

  });

});