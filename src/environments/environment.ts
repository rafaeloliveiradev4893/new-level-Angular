const productionApiUrl = 'https://new-level-spring.onrender.com';
const localApiUrl = 'http://localhost:8080';
const isProduction = false;

export const environment = {
  production: isProduction,
  apiUrl: isProduction ? productionApiUrl : localApiUrl,
  apiUrls: {
    production: productionApiUrl,
    local: localApiUrl,
  },
};
