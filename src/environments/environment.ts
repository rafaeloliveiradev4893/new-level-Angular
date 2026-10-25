const productionApiUrl = 'https://new-level-spring.onrender.com';
const localApiUrl = 'http://localhost:8080';

export const environment = {
  production: true,
  apiUrl: productionApiUrl,
  apiUrls: {
    production: productionApiUrl,
    local: localApiUrl,
  },
};
