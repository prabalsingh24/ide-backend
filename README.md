# Coding Blocks IDE Backend
Backend app for Coding Blocks IDE

### Steps to run locally

Please ensure you have the following installed:


[node.js]("https://nodejs.org/en/")

[npm]("https://www.npmjs.com/")

[postgres]("https://www.postgresql.org/")

Install project dependencies:

````
npm install
````

You'll now have to setup a blank database and credentials in Postgres. The database will be configured by the schema automatically. If you're not familiar with this, please use the "Further Reading" section.

Inside the folder ````util````, copy the contents of ````environment.sh.example ```` into a new file named ````environment.sh````. Modify the contents of this file as per the credentials and database name you setup in postgres.

````
npm start
````


### Project Stucture

The project has been created express.js and therefore has a similar structure to all express.js apps.

````
routes/ –  Contains all routes split as per their catergory into their respective files
views/  – Jade templates for all the views
util/ – Contains database and environment configuration files
public/ – Contains assets served along with the webpages
````

### Set up on Docker
Create the docker image for the ide-backend from the Dockerfile
```terminal
docker build -t ide-backend .
```

Run this image in a container using the docker-compose file

-To run in terminal and follow
```
docker-compose up ide-backend
```
-To run as background process
```
docker-compose up -d ide-backend
```
Port 3000 in docker is mapped with localhost:3000 so you can run this app from localhost:3000.

If you wish to run other apps such as [ide frontend](https://github.com/coding-blocks/ide) or [judge api](https://github.com/coding-blocks/judge-api) with this, connect this docker container with those via docker network - 'ide-backend-network'. Check the docker file for more details.

### Further Reading

[express.js]("https://expressjs.com/")

[Setup Postgresql database and users]("https://www.techrepublic.com/blog/diy-it-guy/diy-a-postgresql-database-server-setup-anyone-can-handle/")

