import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://asterios.tm/index.php',
});

export const fetcher = (params) => instance({params}).then(res => res.data)
export const fetcherBase = (url) => axios(url).then(res => res.data)
