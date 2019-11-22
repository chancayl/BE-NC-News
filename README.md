# BE-NC-News

The project consists of a JavaScript API to use in the NorthCoders Front End Module. The API performs a migration and runs a seed function to insert the appropriate
data into a database by using Knex. Besides, the API contains several endpoints, which could be used by the client to make a request, update, post and delete information. Finally, the API is hosted using Heroku. This informations can be found on [https://my-nc-first-app.herokuapp.com/api]

# Getting Started
* Download [https://code.visualstudio.com/] or another alternative source-code editor of your preference
* Download the project on [https://github.com/chancayl/BE-NC-News.git].
* Go to your terminal an run the the following commmand --> git clone https://github.com/chancayl/BE-NC-News.git.
* Acces to Visual Studio Code or another alternative source-code editor an open the project. Alternatively, you can access the project on through the terminal.
* Install npm package manager for the JavaScript.
* Install Mocha and Chai for unit testing and supertest for testing HTTP.
* Install Knex.js, which is a query builder for PostgreSQL.
* Install Heroku for hosting. Heroku is a cloud platform and supports several programming languages such as JavaScript.

# Prerequisites
* Visual Studio Code or another alternative source-code editor.
* Linux.
* npm.
* JavaScript.
* PostgreSQL.
* Knex.
* Express.

# API functionalities
The API contains several endpoints such as:
* GET /api/topics --> Returns an array of topic objects.
* GET /api/users/:username -->  Returns user object.
* GET /api/articles/:article_id --> Returns an article object.
- comment_count which is the total count of all the comments with this article_id.
* PATCH /api/articles/:article_id --> Pass an object such as { inc_votes: newVote } and returns the article with the number of votes updated.
* POST /api/articles/:article_id/comments --> Pass an object with username and body and returns the posted comment.
* GET /api/articles/:article_id/comments --> Returns an array of comments for the given article_id. It accepts querires such as sort_by by attribute and order by ascending or descending and by default the attribute is "created_at" in  descending order
* GET /api/articles --> Returns an array of article objects. It accepts queries such as sort_by by attribute, order by ascending or descending and by default, the attribute is "date" in descending order. Besides, it accepts filter queries for the "author" of the article and "topic" of the article.
* PATCH /api/comments/:comment_id -->  Pass an object such as { inc_votes: newVote } and returns the comment with the number of votes updated.
* DELETE /api/comments/:comment_id --> delete the given comment by "comment_id"
* GET /api --> JSON describing all the available endpoints on the API

# Database schema
* User table:
      - username primary key
      - avatar_url
      - name
* Topics table:
      - slug primary key
      - description
      - name
      -
* Articles table:
      - article_id Primary Key
      - title
      - body
      - votes
      - topic Foreign Key
      - author Foreign Key
      - created_at
      -
* Comments table:
      - comment_id Primary Key
      - author Foreign Key
      - article_id Foreign Key
      - votes
      - created_at
      - body

# Built With
* Linux - Operating system
* npm - Testing
* JavaScript - Build the API
* PSQL -Database
* Knex - Connect JavaScript with the database
* Express - Web application framework