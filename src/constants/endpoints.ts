const baseUrl = process.env.REACT_APP_ENDPOINT;
console.log('process.env', process.env);

export const endpoints = {
  wish: {
    GET_ALL: `${baseUrl}/wishes`,
    CREATE: `${baseUrl}/add-wish`,
  },
};
