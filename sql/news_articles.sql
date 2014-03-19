CREATE TABLE news_articles (
  article_id serial primary key,
  org_id bigint unsigned,
  feed_id bigint unsigned,
  category_id bigint unsigned,
  title text,
  publishedDate datetime,
  mediaGroups text,
  contentSnippet text,
  link text,

  foreign key (org_id) REFERENCES news_orgs(org_id),
  foreign key (category_id) REFERENCES news_categories(category_id)
);