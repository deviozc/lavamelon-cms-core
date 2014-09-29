# Lavamalen CMS

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

| Endpoint | Description |
| ---- | --------------- |
| POST /users | Add a user (Admin only) | Param: email, password, fullName, admin(boolean) |
| PUT /users | update a user (Admin only) | Param: id, email, password, fullName, admin(boolean) |
| POST /users/login | Login user | Param: email, password |
| POST /users/logout | Logout user (user only) | no param |
| GET /users/me | get user profile (login user only) | no param |

###Site

| Endpoint | Description |
| ---- | --------------- |
| POST /sites | Add a site (Admin only) | Param: domain |
| POST /users/:userId/sites/siteId | Add site owner (admin only) | no param |

###Content Type - Article

A generic content type that stores title and content

| Endpoint | Description |
| ---- | --------------- |
| POST /articles | Add an article (site owner only) | Param: json {'template':templateName, 'section': sectionName, 'site': siteId, en: {title: "title", body: "body"}} |
| PUT /articles | Edit an article (site owner only) | Param: same as POST |
| GET /sites/:domain/articles | Get all articles of the domain | param: no param |
| GET sites/:domain/section/:section/articles | Get all articles of a section of a site | param: no param |