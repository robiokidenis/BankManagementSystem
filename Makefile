.PHONY: up frontend backend database down frontend-dev

up:
	docker-compose up -d

frontend:
	cd Frontend && \
	yarn

	cd Frontend && \
	yarn build

	cd Frontend && \
	yarn start

frontend-dev:
	cd Frontend && \
	yarn

	cd Frontend && \
	yarn dev

backend:
	cd Backend && \
	composer install

	cd Backend && \
	php artisan migrate:fresh --seed

	cd Backend && \
	php artisan serve

database:
	cd Backend && \
	touch database/database.sqlite

down:
	docker-compose down --rmi all
