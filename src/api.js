import axios from 'axios';

const newsAPI = axios.create({
  baseURL: 'https://black-springbok-cap.cyclic.app/api/',
});

export const getArticles = (page, topic, sort_by, order) => {
  return newsAPI
    .get('/articles', {
      params: {
        p: page,
        topic: topic,
        sort_by,
        order,
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
    .patch(`/articles/${article_id}`, { inc_votes })
    .then((res) => res.data.article);
};

export const getUsers = () => {
  return newsAPI.get('/users').then((res) => res.data.users);
};

export const postComment = (article_id, username, body) => {
  return newsAPI
    .post(`/articles/${article_id}/comments`, { username, body })
    .then((res) => res.data.comment);
};

export const getTopics = () => {
  return newsAPI.get('/topics').then((res) => res.data.topics);
};

export const deleteCommentByCommentId = (comment_id) => {
  return newsAPI.delete(`/comments/${comment_id}`).then((res) => res.status);
};
