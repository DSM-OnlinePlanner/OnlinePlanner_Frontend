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

    (error) => {


        const {
            config,
            response: {status},
        } = error;

        const refreshToken = localStorage.getItem('refreshToken');

        const originalRequest = config;
        if(refreshToken === null){ //리프레쉬 토큰이 없으면
            return Promise.reject(error);
        }

        //리프레쉬 토큰이 있다.
        const header = {
            'X-Refresh-Token' : refreshToken
        }

        const response =  axios.put('api/auth', null, { //헤더에 리프레쉬 토큰을 담음
            headers: header
        })
        .then((response) => { //토큰 리프레쉬 함 성공
            const {accessToken, refreshToken} = response.data;
            
            instance.defaults.headers.common['Authorization'] = accessToken;
            localStorage.setItem('refreshToken', refreshToken);

            originalRequest.headers = {'Authorization' : accessToken};
            const newResponse = axios(originalRequest).then(response => response).catch(error => error);
            return newResponse;
        })
        .catch(() => { //리프레쉬 실패 리프레쉬 토큰 만료 실패
            instance.defaults.headers.common['Authorization'] = null;
            localStorage.removeItem('refreshToken');

            return Promise.reject(error);
        })

        return response;
    }
)


export default instance;