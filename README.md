# NC News - Front End

This repo contains the front end development of the NC News app, using data obtained through my [NC News server](https://github.com/alexcupit/nc-news)

The site has been hosted and is live: https://acnews.netlify.app/

## Description

This site dispalys data from the northcoders news dataset.

As a user, you can find various news articles, filtered by topic and ordered by date and their number of votes. Users can also vote on each article.

User authentication is not needed for this demo site or to access authorised user functionality, you can choose from the list of already existing users on the log in screen.

As an authorised user, you can leave a comment on an article and delete any previous comments made using that username.

There is also error handling throughout to help guide users to take the correct action.

## Local usage

This app can be run locally by cloning this repo:

```
git clone https://github.com/alexcupit/fe-nc-news.git
```

before installing dependencies `npm install` and
and running `npm start` to open the local app in the browser.

This app was made using node v18.10.0

## Routes

Here are some routes to use on this site:

[/](https://acnews.netlify.app/) - home page showing the latest articles from all topics

[/topics](https://acnews.netlify.app/topics) - shows a list of all topics, also visible in the nav bar

[/topics/cooking](https://acnews.netlify.app/topics/cooking) - shows a list of articles with a topic of cooking

[/articles/34](https://acnews.netlify.app/articles/34) - an example article with relevant votes and comments

[/login](https://acnews.netlify.app/login) - ability to choose from pre-authenticated users

[/myaccount](https://acnews.netlify.app/myaccount) - shows current logged in user and provides ability to log out
