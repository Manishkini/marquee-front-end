import axios from 'axios';

// // For common config
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const zaubacorpAxios = axios.create({
  baseURL: 'https://www.zaubacorp.com/',
});

const localAxios = axios.create({
  baseURL: 'http://localhost:9630/',
});

export { zaubacorpAxios, localAxios };
