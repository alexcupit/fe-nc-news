import axios from 'axios';

const newsAPI = axios.create({
  baseURL: 'https://black-springbok-cap.cyclic.app/api/',
});

export const getArticles = (page) => {
  return newsAPI
    .get('/articles', {
      params: {
        p: page,
      },
    })
    .then((res) => {
      return res.data.articles;
    });
};
