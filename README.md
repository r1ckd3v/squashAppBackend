# squashAppBackend

This is an Express Server to handle the backend of the Squash Tournaments App

# Start the server

1. Enable the Database Container `docker-compose up -d` or `podman-compose up -d`
2. Start the server `npm start`

# Routes

## Health Check

GET `/health`

## Players

### Create

POST `/players/create`

### Read

GET `/players/all`
GET `/players/:id`

### Update

PATCH `/players/:id`
PUT `/players/:id`

### Delete

DELETE `/players/:id`

## Matches

Coming soon...
