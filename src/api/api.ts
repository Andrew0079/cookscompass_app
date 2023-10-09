import {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  LockedOutError,
  AbortError,
  ApiError,
} from "./api-error";
import { Platform } from "react-native";

import axios, { AxiosInstance } from "axios";

export default class Api {
  private api: AxiosInstance;

  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
      timeout: 10000, // Adjust the timeout as needed
    });
  }

  // Set a new baseURL for the API instance
  setBaseURL(baseURL) {
    this.api.defaults.baseURL = baseURL;
  }

  // Make a GET request
  async get(endpoint, params = {}) {
    try {
      const response = await this.api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  // Make a POST request
  async post(endpoint, data = {}, params = {}) {
    try {
      const response = await this.api.post(endpoint, data, { params });
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  // Make a PATCH request
  async patch(endpoint, data = {}, params = {}) {
    try {
      const response = await this.api.patch(endpoint, data, { params });
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  // Make a DELETE request
  async delete(endpoint, params = {}) {
    try {
      const response = await this.api.delete(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleRequestError(error);
    }
  }

  // Handle errors and throw appropriate exceptions
  handleRequestError(error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        throw new UnauthorizedError("Unauthorized");
      } else if (status === 403) {
        throw new ForbiddenError("Forbidden");
      } else if (status === 404) {
        throw new NotFoundError("Not Found");
      } else if (status === 429) {
        throw new LockedOutError("Too Many Requests");
      } else {
        throw new ApiError(
          `An error occurred while making the request. ${error}`
        );
      }
    } else if (axios.isCancel(error)) {
      throw new AbortError("Request canceled by the user.");
    } else {
      throw new ApiError(
        `An error occurred while making the request. ${error}`
      );
    }
  }

  getRandomRecipes(params = {}) {
    return this.get("/random-recipes", params);
  }
}

const URL =
  Platform.OS === "android"
    ? process.env.EXPO_PUBLIC_ANDROID_DEV
    : process.env.EXPO_PUBLIC_BASE_URL_IOS_DEV;
// Initialize the Api instance with your desired base URL

export const api = new Api(URL);
