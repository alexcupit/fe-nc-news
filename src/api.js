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

export const patchArticleById = (article_id, inc_votes) => {
  return newsAPI
    .patch(`/articlsdfes/${article_id}`, { inc_votes })
    .then((res) => res.data.article);
};
