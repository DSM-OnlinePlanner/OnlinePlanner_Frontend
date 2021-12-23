import axios from "axios";

const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
const instance = axios.create({ baseURL: `${PROXY}` });
const isRefreshing = false;

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
      const response = await axios.put(`${PROXY}/api/auth`, null, {
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
    // (error) => {
    //   const {
    //     config,
    //     response: { status },
    //   } = error;
    //   // if (status !== 403) {
    //   //   return Promise.reject(error);
    //   // }
    //   console.log("A");
    //   const refreshToken = localStorage.getItem("refreshToken");

    //   const originalRequest = config;
    //   if (refreshToken === null) {
    //     //리프레쉬 토큰이 없으면
    //     window.location.href = "/login";
    //     return Promise.reject(error);
    //   }

    //   //리프레쉬 토큰이 있다.
    //   const header = {
    //     "X-Refresh-Token": refreshToken,
    //   };
    //   const response = axios
    //     .put("api/auth", null, {
    //       //헤더에 리프레쉬 토큰을 담음
    //       headers: header,
    //     })
    //     .then((response) => {
    //       console.log("B");
    //       //토큰 리프레쉬 함 성공
    //       const { accessToken, refreshToken } = response.data;

    //       instance.defaults.headers.common["Authorization"] = accessToken;
    //       localStorage.setItem("refreshToken", refreshToken);

    //       originalRequest.headers = { Authorization: accessToken };
    //       const newResponse = axios(originalRequest)
    //         .then((response) => {
    //           console.log("C");
    //           return Promise.resolve(response);
    //         })
    //         .catch((error) => {
    //           console.log("D");
    //           return Promise.reject(error);
    //         });
    //       return newResponse;
    //     })
    //     .catch((error) => {
    //       //리프레쉬 실패 리프레쉬 토큰 만료 실패
    //       console.log("E");
    //       instance.defaults.headers.common["Authorization"] = null;
    //       localStorage.removeItem("refreshToken");
    //       window.location.href = "/login";
    //       return Promise.reject(error);
    //     });
    //   return response;
    // }
  }
);

export default instance;
