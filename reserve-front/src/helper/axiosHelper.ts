import { AxiosResponse } from 'axios';

type requestFunc = () => Promise<AxiosResponse>;

export interface ResponseReturnType {
  data?: any;
  success: boolean;
  msg?: string;
}

export const axiosRequest = async (func: requestFunc): Promise<ResponseReturnType> => {
  try {
    const response = await func();
    return {
      data: response.data.data,
      success: response.data.success,
      msg: response.data.msg,
    };
  } catch (error: any) {
    if (error.response.status === 400) {
      return {
        success: false,
        msg: error.response.data.msg,
      };
    }

    return {
      success: false,
      msg: '서버와 연결에 실패하였습니다.',
    };
  }
};

export default {};