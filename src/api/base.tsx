import axios, { AxiosResponse } from "axios";

export class HttpError extends Error {
  public status: number;
  // eslint-disable-next-line
  public response: any;
  public url: string;

  // eslint-disable-next-line
  constructor(status: number, message: string, response: any, url: string) {
    super(message);
    this.status = status;
    this.response = response;
    this.url = url;
  }

  toString() {
    return `HttpError: ${this.status} - ${this.message} (URL: ${this.url})`;
  }
}

export interface SignResponse {
  status: number;
  // eslint-disable-next-line
  response: any;
}

interface InitOptions {
  skipError?: boolean;
  allowStatus?: number[];
}

export async function getFormTravelServer(
  url: string,
  init: InitOptions = { skipError: false },
): Promise<AxiosResponse> {
  const server = import.meta.env.VITE_TRAVEL_SERVER_PREFIX;
  const serverUrl = server + url;
  return axios
    .get(serverUrl, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => responseHandler(response, serverUrl, init))
    .catch(errorHandler);
}

export async function getFromGameServer(
  url: string,
  init: InitOptions = { skipError: false },
): Promise<AxiosResponse> {
  const server = import.meta.env.VITE_GAME_SERVER_PREFIX;
  const serverUrl = server + url;
  return axios
    .get(serverUrl, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => responseHandler(response, serverUrl, init))
    .catch(errorHandler);
}

export async function getFromStreamingServer(
  url: string,
  init: InitOptions = { skipError: false },
): Promise<AxiosResponse> {
  const server = import.meta.env.VITE_STREAMING_SERVER_PREFIX;
  const serverUrl = server + url;
  return axios
    .get(serverUrl, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => responseHandler(response, serverUrl, init))
    .catch(errorHandler);
}

export async function postToStreamingServer(
  url: string,
  // eslint-disable-next-line
  param: any,
  init: RequestInit & { skipError?: boolean } = {},
): Promise<AxiosResponse> {
  // @ts-ignore
  const server = import.meta.env.VITE_STREAMING_SERVER_PREFIX;
  const serverUrl = server + url;
  return axios
    .post(serverUrl, param, {
      headers: { "Content-Type": "application/json" },
    })
    .catch(errorHandler)
    .then((response) => responseHandler(response, serverUrl, init));
}

export async function postToTravelServerMultiPleFile(
  url: string,
  id: string,
  type: string,
  param: Blob,
  init: RequestInit & { skipError?: boolean } = {},
): Promise<AxiosResponse> {
  // @ts-ignore
  const server = import.meta.env.VITE_TRAVEL_SERVER_PREFIX;
  const serverUrl = server + url;
  let formData = new FormData();

  formData.append("id", id);
  formData.append("file", param);
  formData.append("type", type);

  return axios
    .post(serverUrl, formData, {
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    })
    .catch(errorHandler)
    .then((response) => responseHandler(response, serverUrl, init));
}

export async function getFormPrivateServer(
  url: string,
  init: InitOptions = { skipError: false },
): Promise<AxiosResponse> {
  const server = import.meta.env.VITE_PRIVATE_SERVER_PREFIX;
  const serverUrl = server + url;
  return axios
    .get(serverUrl, { headers: { "Content-Type": "application/json" } })
    .then((response) => responseHandler(response, serverUrl, init))
    .catch(errorHandler); // ✅ 항상 마지막에 배치!
}

export async function postToPrivateServer(
  url: string,
  // eslint-disable-next-line
  param: any,
  init: RequestInit & { skipError?: boolean } = {},
): Promise<AxiosResponse> {
  // @ts-ignore
  const server = import.meta.env.VITE_PRIVATE_SERVER_PREFIX;
  const serverUrl = server + url;
  return axios
    .post(serverUrl, param, {
      headers: { "Content-Type": "application/json" },
    })
    .catch(errorHandler)
    .then((response) => responseHandler(response, serverUrl, init));
}

export async function getGamesFromGameServer(
  url: string,
  init: InitOptions = { skipError: false },
) {
  const server = import.meta.env.VITE_GAME_SERVER_PREFIX;
  const serverUrl = server + url;
  return axios
    .get(serverUrl, { headers: { "Content-Type": "text/html" } })
    .then((response) => htmlResponseHandler(response, serverUrl, init))
    .catch((error) => errorHandler(error));
}

async function htmlResponseHandler(
  response: AxiosResponse,
  url: string,
  init: InitOptions = { skipError: false, allowStatus: [200, 201, 204] },
): Promise<string> {
  if (!init.allowStatus?.includes(response.status)) {
    const text = response.data; // ✅ HTML 응답은 JSON 변환 불필요
    throw new HttpError(response.status, "HTML response error", text, url);
  }

  return response.data as string; // ✅ HTML 형식이므로 그대로 문자열 반환
}

async function responseHandler(
  response: AxiosResponse,
  url: string,
  init: InitOptions = { skipError: false, allowStatus: [200, 201, 204] },
): Promise<AxiosResponse> {
  if (response.status !== 200 && !init.skipError) {
    const text = JSON.stringify(response.data);
    // eslint-disable-next-line
    let jsonResponse: any;

    try {
      jsonResponse = JSON.parse(text);
    } catch {
      throw new HttpError(response.status, text, text, url);
    }

    let message = "An error occurred";
    if (jsonResponse?.errors) {
      message = jsonResponse.errors
        .map((error: { detail: string }) => error.detail)
        .join("\n");
    } else if (jsonResponse?.message) {
      message = jsonResponse.message;
    }

    throw new HttpError(response.status, message, jsonResponse, url);
  }

  return response;
}

// eslint-disable-next-line
function errorHandler(error: any): never {
  if (axios.isAxiosError(error) && error.response) {
    const { status, data, config } = error.response;
    const message = data?.message || "An unexpected error occurred.";

    throw new HttpError(status, message, data, config.url || "Unknown URL");
  } else {
    throw new HttpError(
      0,
      "Network error or server is unreachable",
      null,
      "Unknown URL",
    );
  }
}
