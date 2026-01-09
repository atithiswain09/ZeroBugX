import axios from './index';

export const sendPrompt = async ({ prompt, code }) => {
  const res = await axios.post('/ai', { prompt, code });
  return res.data;
}
