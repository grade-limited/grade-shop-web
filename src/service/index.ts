// Axios
import config from "@/config";
import axios from "axios";
import { authService } from "./auth";
import crypto from "@/utilities/crypto";

// Configuring root url
export const rootURL: string | undefined = config.apiURL;

// configuring axios on initial load with the authorization token from localstorage it exists
export const instance = axios.create({
	baseURL: rootURL,
	headers: {
		accept: "*/*",
	},
});

instance.interceptors.request.use((configuration) => {
	// Check if the token exists in cookies
	const token = authService.getToken();

	if (token) {
		configuration.headers.Authorization = `Bearer ${token}`;
	}

	configuration.headers.set("x-api-key", crypto?.encryptKey?.(config.xApiKey));

	return configuration;
});

export const previewImage = (fileName: string) => {
	console.log(fileName);
	return fileName ? `${rootURL}/files/${fileName}` : "";
};

export default instance;
