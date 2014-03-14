CREATE TABLE news_articles (
  article_id serial primary key,
  org_id bigint unsigned,
  title text,
  publishedDate datetime,
  mediaGroups text,
  contentSnippet text,
  link text,

  foreign key (org_id) REFERENCES news_orgs(org_id)
);