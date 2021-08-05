import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type DefaultRequestParams = 'headers' | 'params' | 'paramsSerializer' | 'timeout';
export type WithoutRequestBodyConfig = Pick<AxiosRequestConfig, DefaultRequestParams>;
export type RequestBodyConfig = Pick<AxiosRequestConfig, DefaultRequestParams | 'data'>;

const mattermostInstance = axios.create({
  baseURL: 'https://mattermost.lubycon.io',
});

function axiosResponseHandler<T>(response: AxiosResponse<T>) {
  return response.data;
}

async function get<ResponseBody>(path: string, config?: WithoutRequestBodyConfig) {
  return axiosResponseHandler(await mattermostInstance.get<ResponseBody>(path, config));
}

async function post<ResponseBody>(path: string, data?: any, config?: RequestBodyConfig) {
  return axiosResponseHandler(await mattermostInstance.post<ResponseBody>(path, data, config));
}

async function put<ResponseBody>(path: string, data?: any, config?: RequestBodyConfig) {
  return axiosResponseHandler(await mattermostInstance.put<ResponseBody>(path, data, config));
}

async function patch<ResponseBody>(path: string, data?: any, config?: RequestBodyConfig) {
  return axiosResponseHandler(await mattermostInstance.patch<ResponseBody>(path, data, config));
}

async function remove<ResponseBody>(path: string, config?: WithoutRequestBodyConfig) {
  return axiosResponseHandler(await mattermostInstance.delete<ResponseBody>(path, config));
}

export default {
  rawGet: mattermostInstance.get,
  get,
  rawPost: mattermostInstance.post,
  post,
  rawPut: mattermostInstance.put,
  put,
  rawPath: mattermostInstance.patch,
  patch,
  rawDelete: mattermostInstance.delete,
  delete: remove,
  instance: mattermostInstance,
};
