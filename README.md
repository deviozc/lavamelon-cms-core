# Lavamalon CMS

## Overview

A content management system backend based on Sails.js that supports multi-site.

## Getting start

Setup database connection in /config/connections.js

Setup server environment in /config/env/

```bash
sails lift
```

##RESTful API

###User

| Endpoint | Description | Parameters |
| ---- | --------------- | ---------------------|
| POST /users | Add a user (Admin only) | email, password, fullName, admin(boolean) |
| PUT /users | update a user (Admin only) | id, email, password, fullName, admin(boolean) |
| POST /users/login | Login user | email, password |
| POST /users/logout | Logout user (user only) | none |
| GET /users/me | get user profile (login user only) | none |

###Site

| Endpoint | Description | Parameters |
| ---- | --------------- | ---------------------|
| POST /sites | Add a site (Admin only) | domain |
| POST /users/:userId/sites/siteId | Add site owner (admin only) | none |

###Content Type - Article

A generic content type that stores title and content

| Endpoint | Description | Parameters |
| ---- | --------------- | ---------------------|
| POST /articles | Add an article (site owner only) | json {'template':templateName, 'section': sectionName, 'domain': domain, en: {title: "title", body: "body"}} |
| PUT /articles/:articleId | Edit an article (site owner only) | same as POST |
| GET /sites/:domain/articles | Get all articles of the domain | none |
| GET sites/:domain/section/:section/articles | Get all articles of a section of a site | none |