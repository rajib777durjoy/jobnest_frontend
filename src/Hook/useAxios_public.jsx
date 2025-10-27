import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:7000',
});
const useAxios_public = () => {
  return instance;
};

export default useAxios_public;