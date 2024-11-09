# Pull latest images and recreate containers
# Yes, this is a monkey patch. Automation is coming soon :-)
docker --context tekken compose -f docker-compose.production.yaml down
docker --context tekken compose -f docker-compose.production.yaml pull
docker --context tekken compose -f docker-compose.production.yaml up -d --force-recreate
