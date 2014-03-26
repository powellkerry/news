CREATE TABLE news_orgs (
  org_id serial primary key,
  org_name text,
  active boolean default false
);

INSERT INTO news_orgs (org_name) VALUES ('Fox News');
INSERT INTO news_orgs (org_name) VALUES ('MSNBC');
INSERT INTO news_orgs (org_name) VALUES ('CNN');
INSERT INTO news_orgs (org_name) VALUES ('USA Today');
INSERT INTO news_orgs (org_name) VALUES ('New York Times');