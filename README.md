# TekkenSpace

## Workflow

### Deployment
The website is automatically deployed to the server when a new GitHub release is created.
The release must be tagged with a version number, e.g. `1.0.0`.

To create the Docker image manually, run the following command.

```bash
docker build -f . -t rherwig/tekken-space:latest .
# Push the image to Docker Hub (in case of deployment)
docker push rherwig/tekken-space:latest
```

Deploying the image to the production server requires a Docker Swarm to be set up.
To do this, run the following commands on the server or via a Docker context.

```bash
docker swarm init
```

Then, the application can be deployed using the following command.

```bash
docker stack deploy -c docker-compose.production.yml tekken-space
```
