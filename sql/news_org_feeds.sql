create table news_org_feeds (
  feed_id serial primary key,
  org_id bigint unsigned,
  category_id bigint unsigned,
  feed_name text,
  feed_url text,

  FOREIGN KEY (org_id) REFERENCES news_orgs(org_id),
  FOREIGN KEY (category_id) REFERENCES news_categories(category_id)
);

INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (1, 'News', 'http://www.msn.com/rss/msnnews.aspx');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (1, 'Entertainment', 'http://www.msn.com/rss/MsnEntertainment.aspx');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (1, 'Obits', 'http://news.msn.com/rss/msnnews-obits');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (1, 'Politics', 'http://news.msn.com/rss/msnnews-politics');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (1, 'Pop Culture', 'http://news.msn.com/rss/msnnews-pop-culture');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (1, 'Sci-Tech', 'http://news.msn.com/rss/msnnews-sci-tech');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (1, 'US', 'http://news.msn.com/rss/msnnews-us');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (1, 'World', 'http://news.msn.com/rss/msnnews-world');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (1, 'Crime-Justice', 'http://news.msn.com/rss/msnnews-crime-justice');

INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'Top Stories', 'http://rss.cnn.com/rss/cnn_topstories.rss');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'World', 'http://rss.cnn.com/rss/cnn_world.rss');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'US', 'http://rss.cnn.com/rss/cnn_us.rss');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'Business', 'http://rss.cnn.com/rss/money_latest.rss');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'Politics', 'http://rss.cnn.com/rss/cnn_allpolitics.rss');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'Crime', 'http://rss.cnn.com/rss/cnn_crime.rss');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'Technology', 'http://rss.cnn.com/rss/cnn_tech.rss');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'Health', 'http://rss.cnn.com/rss/cnn_health.rss');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'Entertainment', 'http://rss.cnn.com/rss/cnn_showbiz.rss');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'Travel', 'http://rss.cnn.com/rss/cnn_travel.rss');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'Living', 'http://rss.cnn.com/rss/cnn_living.rss');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'Video', 'http://rss.cnn.com/rss/cnn_freevideo.rss');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (2, 'CNN Student News', 'http://rss.cnn.com/rss/cnn_studentnews.rss');

INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (3, 'US', 'http://rssfeeds.usatoday.com/UsatodaycomNation-TopStories');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (3, 'Washington', 'http://rssfeeds.usatoday.com/UsatodaycomWashington-TopStories');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (3, 'World', 'http://rssfeeds.usatoday.com/UsatodaycomWorld-TopStories');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (3, 'Health', 'http://rssfeeds.usatoday.com/UsatodaycomHealth-TopStories');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (3, 'Politics', 'http://rssfeeds.usatoday.com/TP-OnPolitics');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (3, 'Money', 'http://rssfeeds.usatoday.com/UsatodaycomMoney-TopStories');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (3, 'Sports', 'http://rssfeeds.usatoday.com/UsatodaycomSports-TopStories');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (3, 'Life', 'http://rssfeeds.usatoday.com/usatoday-LifeTopStories');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (3, 'Technology', 'http://rssfeeds.usatoday.com/usatoday-TechTopStories');

INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (4, 'World', 'http://rss.nytimes.com/services/xml/rss/nyt/World.xml');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (4, 'US', 'http://rss.nytimes.com/services/xml/rss/nyt/US.xml');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (4, 'Business', 'http://rss.nytimes.com/services/xml/rss/nyt/Business.xml');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (4, 'Technology', 'http://rss.nytimes.com/services/xml/rss/nyt/Technology.xml');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (4, 'Sports', 'http://rss.nytimes.com/services/xml/rss/nyt/Sports.xml');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (4, 'Science', 'http://rss.nytimes.com/services/xml/rss/nyt/Science.xml');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (4, 'Health', 'http://rss.nytimes.com/services/xml/rss/nyt/Health.xml');

INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (5, 'Entertainment', 'http://feeds.foxnews.com/foxnews/entertainment');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (5, 'Health', 'http://feeds.foxnews.com/foxnews/health');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (5, 'Lifestyle', 'http://feeds.foxnews.com/foxnews/section/lifestyle');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (5, 'Politics', 'http://feeds.foxnews.com/foxnews/politics');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (5, 'Science', 'http://feeds.foxnews.com/foxnews/science');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (5, 'Sports', 'http://feeds.foxnews.com/foxnews/sports');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (5, 'Tech', 'http://feeds.foxnews.com/foxnews/tech');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (5, 'Travel', 'http://feeds.foxnews.com/foxnews/internal/travel/mixed');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (5, 'US', 'http://feeds.foxnews.com/foxnews/national');
INSERT INTO news_org_feeds (org_id, feed_name, feed_url) VALUES (5, 'World', 'http://feeds.foxnews.com/foxnews/world');



