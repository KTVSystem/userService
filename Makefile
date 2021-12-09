up: docker-up
down: docker-down
build: docker-build


docker-up:
	docker-compose up -d
docker-down:
	docker-compose down --remove-orphans
docker-build:
	docker-compose build


### npm test
### npx jest --coverage
### npm run lint

### sudo systemctl stop docker
### sudo systemctl start docker

### docker-compose run --rm server sh
### docker-compose run --rm client sh
