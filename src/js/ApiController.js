import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    const refreshToken = localStorage.getItem("refreshToken");

    const originalRequest = config;
    if (refreshToken === null) {
      //리프레쉬 토큰이 없으면
      window.location.href = "/login";
      return Promise.reject(error);
    }

    //리프레쉬 토큰이 있다.
    const header = {
      "X-Refresh-Token": refreshToken,
    };

    try {
      const response = await axios.put(`/api/auth`, null, {
        //헤더에 리프레쉬 토큰을 담음
        headers: header,
      });

      //토큰 리프레쉬 함 성공
      const { accessToken, refreshToken } = response.data;

      instance.defaults.headers.common["Authorization"] = accessToken;
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);

      originalRequest.headers = { Authorization: accessToken };
      originalRequest.data = {
        ...originalRequest.data,
      };

      try {
        const newResponse = await axios(originalRequest);

        return newResponse;
      } catch (error) {
        return Promise.reject(error);
      }
    } catch (error) {
      if (error.response.status === 404) {
        const accessToken = localStorage.getItem("accessToken");
        originalRequest.headers = { Authorization: accessToken };
        originalRequest.data = {
          ...originalRequest.data,
        };

        try {
          const newResponse = await axios(originalRequest);

          return newResponse;
        } catch (error) {
          return Promise.reject(error);
        }
      } else {
        // 리프레쉬 실패 리프레쉬 토큰 만료 실패
        instance.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("refreshToken");

        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
