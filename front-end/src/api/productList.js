import { useQuery } from "react-query";
import auth from "../config/axios";

export const getPru = async () => {
  let response = await auth.get("/api");
  return response.data;
};

export const useApi = () => {
  const info = useQuery("todos", getPru);
  return info;
};
