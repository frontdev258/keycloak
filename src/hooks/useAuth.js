import axios from "axios";

export const axiosInstance = axios.create({});

export function useAuth() {
  const keycloak = localStorage.getItem("keycloak");
  const { access_token: token, refresh_token } = keycloak
    ? JSON.parse(keycloak)
    : { access_token: null, refresh_token: null };

  const refreshToken = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "residence-ui");
    // urlencoded.append("client_secret", "ZrWUmP2RSCUBm5JvmSL4QLh5B5PqIm4b");
    urlencoded.append("refresh_token", refresh_token);
    urlencoded.append("grant_type", "refresh_token");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      "http://192.180.9.79:8085/auth/realms/mtna/protocol/openid-connect/token",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => localStorage.setItem("keycloak", result))
      .catch((error) => console.log("error", error));
  };

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        await refreshToken();
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${refresh_token}`;
        return axiosInstance(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  async function getApi({ queryKey }) {
    console.log("in get api");
    let request = queryKey.join("/");
    try {
      const { data } = await axiosInstance.get(request, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error();
    }
  }

  async function sendRequest({
    method,
    endpoint,
    query = null,
    data = {},
    headers = {},
  }) {
    return await axiosInstance(endpoint, {
      method,
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data,
    });
  }

  return { getApi, sendRequest, refreshToken };
}
