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
	@if grep -q "^DB_DATABASE=" Backend/.env; then \
		sed -i '' -e 's|^DB_DATABASE=.*|DB_DATABASE=/var/www/Backend/database/database.sqlite|' Backend/.env; \
	else \
		echo "DB_DATABASE=/var/www/Backend/database/database.sqlite" >> Backend/.env; \
	fi
	@cd Backend && touch database/database.sqlite


down:
	docker-compose down --rmi all
