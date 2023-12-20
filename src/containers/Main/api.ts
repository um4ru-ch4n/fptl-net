import axios, { AxiosInstance } from "axios";
import { NodeReq } from "./store";

export const axiosInstance = (): AxiosInstance => {
    return axios.create({
        baseURL: "http://localhost:5000",
        timeout: 2000,
    })
}

export const fptlAPI = {
    solve: (nodeTree: NodeReq) =>
        axiosInstance().post<{ code: string }>('v1/solve', nodeTree)
            .then(res => {
                if (res.status !== 200) {
                    return {
                        error: res.statusText,
                        data: null,
                    }
                }

                return {
                    error: null,
                    data: {
                        code: res.data.code,
                    },
                }
            }).catch(err => {
                return {
                    error: err.response.statusText,
                    data: null,
                }
            }),
}