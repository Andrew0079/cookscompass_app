import {
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  LockedOutError,
  AbortError,
  ApiError,
} from "./api-error";
import { Platform } from "react-native";
import { EXPO_PUBLIC_BASE_URL_IOS_DEV, EXPO_PUBLIC_ANDROID_DEV } from "@env";
import axios, { AxiosInstance } from "axios";
import { signUp, signIn, signOut } from "../services/auth";

export default class Api {
  private api: AxiosInstance;

  // Error Messages;
  private UNAUTHORIZED = "UNAUTHORIZED";
  private FORBIDDEN = "FORBIDDEN";
  private NOT_FOUND = "NOT_FOUND";
  private TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS";
  private API_ERROR_MESSAGE = "An error occurred while making the request";
  private ABORT_ERROR_MESSAGE = "Request canceled by the user";
  private AUTHENTICATION_ERROR = "Authentication error";

  private CREATE_USER = "/users/create";

  private RECIPES_FILTERED = "/recipes/filtered";
  private RECIPES_BY_ID = "/recipes/id";
  private RECIPES_BY_TAG = "/recipes/tag";
  private FOOD_TRIVIA = "/recipes/random-food-trivia";
  private LIKE_RECIPE_ACTION = "/recipes/actions/likes";

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

  // Authentication methods

  // sign-up
  async signUp(email: string, password: string, username: string) {
    try {
      const user = await signUp(email, password, username);

      const displayName = user?.displayName;
      const userEmail = user?.email;
      const emailVerified = user?.emailVerified;
      const phoneNumber = user?.phoneNumber;
      const uid = user?.uid;

      await this.createUser({
        displayName,
        email: userEmail,
        emailVerified,
        phoneNumber,
        uid,
      });
      return user;
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  // signIn
  async signIn(email: string, password: string) {
    try {
      const user = await signIn(email, password);
      return user;
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  // Add a logout method
  async logout() {
    try {
      await signOut();
    } catch (error) {
      this.handleAuthError(error);
    }
  }

  // Handle authentication errors and throw appropriate exceptions
  handleAuthError(error) {
    // Handle authentication-specific errors here, such as incorrect username or password
    throw new ApiError(`${this.AUTHENTICATION_ERROR}: ${error.message}`);
  }

  // Handle errors and throw appropriate exceptions
  handleRequestError(error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        throw new UnauthorizedError(this.UNAUTHORIZED);
      } else if (status === 403) {
        throw new ForbiddenError(this.FORBIDDEN);
      } else if (status === 404) {
        throw new NotFoundError(this.NOT_FOUND);
      } else if (status === 429) {
        throw new LockedOutError(this.TOO_MANY_REQUESTS);
      } else {
        throw new ApiError(`${this.API_ERROR_MESSAGE}. ${error}`);
      }
    } else if (axios.isCancel(error)) {
      throw new AbortError(this.ABORT_ERROR_MESSAGE);
    } else {
      throw new ApiError(`${this.API_ERROR_MESSAGE}. ${error}`);
    }
  }

  createUser(data) {
    return this.post(this.CREATE_USER, data);
  }

  getRecipesByFilter(params = {}) {
    return this.get(this.RECIPES_FILTERED, params);
  }

  getRecipeById(id: string) {
    return this.get(`${this.RECIPES_BY_ID}/${id}`);
  }
  getRecipeByTag(tag: string) {
    return this.get(`${this.RECIPES_BY_TAG}/${tag}`);
  }

  getRandomFoodTrivia() {
    return this.get(`${this.FOOD_TRIVIA}`);
  }

  postLikeRecipeAction(recipeId: string) {
    return this.post(`${this.LIKE_RECIPE_ACTION}/${recipeId}`);
  }
}

const URL =
  Platform.OS === "android"
    ? EXPO_PUBLIC_ANDROID_DEV
    : EXPO_PUBLIC_BASE_URL_IOS_DEV;
// Initialize the Api instance with your desired base URL

export const api = new Api(URL);
