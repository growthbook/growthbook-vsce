import Axios, { AxiosInstance } from "axios";
import { FeatureDefinition } from "../features/types";
import { FeaturesResponse } from "./types";

export interface IApiClient {
  /**
   * Return a list of the FeatureDefinition
   */
  getFeatures: () => Promise<FeatureDefinition[]>;
}

type ApiClientConfig = {
  featuresHost: string;
  appHost: string;
  apiKey: string;
};

export enum ApiError {
  FEATURES_FETCH_ERROR = "features_fetch_error",
}

export class ApiClient implements IApiClient {
  private featuresClient: AxiosInstance;

  constructor(private options: ApiClientConfig) {
    this.featuresClient = Axios.create({
      baseURL: options.featuresHost,
      headers: {
        "X-GrowthBook-Client": "growthbook-vsce",
      },
    });
  }

  getFeatures = async () => {
    return this.featuresClient
      .get<FeaturesResponse>(`/api/features/${this.options.apiKey}`)
      .then((response) => {
        const features: FeatureDefinition[] = [];

        for (const [key, value] of Object.entries(response.data.features)) {
          features.push({
            id: key,
            defaultValue: getPrintedDefaultType(value.defaultValue),
            raw: JSON.stringify(value, null, 2),
          });
        }

        return features;
      })
      .catch((error) => {
        console.error("❗️ getFeatures", error);
        throw new Error(ApiError.FEATURES_FETCH_ERROR);
      });
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- I have no idea what this object is
const getPrintedDefaultType = (o: any): string => {
  if (typeof o === "string") {
    return o;
  }

  if (typeof o === "number") {
    return "" + o;
  }

  try {
    return JSON.stringify(o, null, 2);
  } catch (error) {
    console.error("❗️ getPrintedDefaultType", error);
    return String(o);
  }
};
