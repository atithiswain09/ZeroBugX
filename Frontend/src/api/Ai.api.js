import API from "./index";

export const sendPrompt = async ({ prompt, code }) => {
  const res = await API.post("/ai", { prompt, code });
  return res.data;
};
