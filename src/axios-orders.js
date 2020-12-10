import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-6833f-default-rtdb.firebaseio.com/',
});

export default instance;
