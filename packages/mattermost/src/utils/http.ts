import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type DefaultRequestParams = 'headers' | 'params' | 'paramsSerializer' | 'timeout';
type WithoutRequestBodyConfig = Pick<AxiosRequestConfig, DefaultRequestParams>;
type RequestBodyConfig = Pick<AxiosRequestConfig, DefaultRequestParams | 'data'>;

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
  rawPost: mattermostInstance.post,
  rawPut: mattermostInstance.put,
  rawPath: mattermostInstance.patch,
  rawDelete: mattermostInstance.delete,
  get,
  post,
  put,
  patch,
  delete: remove,
  instance: mattermostInstance,
};
