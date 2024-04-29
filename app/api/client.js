import { create } from "apisauce";
import settings from "../config/settings";

const apiClient = create({
  baseURL: settings.apiURL
})

export default apiClient



