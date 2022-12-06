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
      return res.data;
    });
};

export const getCommentsByArticleId = (article_id) => {
  return newsAPI
    .get(`/articles/${article_id}/comments`)
    .then((res) => res.data.comments);
};

export const getArticleById = (article_id) => {
  return newsAPI.get(`articles/${article_id}`).then((res) => res.data.article);
};
