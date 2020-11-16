const endpoints = {
  APP_URL: process.env.REACT_APP_API_URI ? process.env.REACT_APP_API_URI : "",
  COPY_URL: process.env.REACT_APP_API_URI ? process.env.REACT_APP_API_URI : `${window.location.protocol}//${window.location.hostname}`
};

export default endpoints;
