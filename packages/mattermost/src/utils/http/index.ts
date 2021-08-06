import { createInstance, WithoutRequestBodyOptions } from './core';

const mattermostInstance = createInstance({
  baseURL: 'https://mattermost.lubycon.io',
});

async function get<T>(path: string, options?: WithoutRequestBodyOptions) {
  const response = await mattermostInstance.get<T>(path, options);
  return response.data;
}

async function post<T>(path: string, data?: any, options?: WithoutRequestBodyOptions) {
  const response = await mattermostInstance.post<T>(path, data, options);
  return response.data;
}

async function put<T>(path: string, data?: any, options?: WithoutRequestBodyOptions) {
  const response = await mattermostInstance.put<T>(path, data, options);
  return response.data;
}

async function patch<T>(path: string, data?: any, options?: WithoutRequestBodyOptions) {
  const response = await mattermostInstance.patch<T>(path, data, options);
  return response.data;
}

async function remove<T>(path: string, options?: WithoutRequestBodyOptions) {
  const response = await mattermostInstance.delete<T>(path, options);
  return response.data;
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
};
