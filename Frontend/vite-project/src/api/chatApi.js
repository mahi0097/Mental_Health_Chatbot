import { axiosClient } from "./axiosClient";

export const sendMessageToBot = async (message) => {
    return axiosClient.post("/chat/message", { message });
};
