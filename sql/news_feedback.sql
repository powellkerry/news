CREATE TABLE news_feedback(
  feedback_id serial primary key,
  article_id bigint unsigned,
  bias int,
  quality int,
  relevance int,
  feedback_date timestamp,

  foreign key (article_id) references news_articles(article_id)
);