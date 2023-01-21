include ./backend/.env
export
# target: 
#     @echo "test0"
#     @echo "test1"
help: ## serve for development
	@echo "Usage: make [options] [target] ..."; \
	echo "Targets:"; \
	fgrep -h '##' Makefile | awk -F'##|: ' '{printf "%40s %s\n", $$1, $$3}
	' | fgrep -v fgrep';

freshdb: ## reset db
	@echo "Reset DB"
	@cd backend && php artisan migrate:fresh && php artisan passport:install --force
	
dev: ## serve for development
	@echo "starting Dev enviroment"
	@cd frontend && npm run start &
	@cd backend && php artisan serve --port=8000

install: ## performs initial setup
	@echo "Installing libraries"
	@cd backend && composer update && composer install && cp .env.example .env
	@cd frontend && npm install
	
i: ## performs initial setup
	@echo "Installing libraries"
	@cd backend && composer update && composer install
	@cd frontend && npm install

prettier: ##prettier
	@echo "lunch prettier"
	@cd frontend && npx prettier --write . &
	@cd backend && npx prettier --write . 

runProd: ## to clear the cache
	@echo "run prod"
	@cd backend && php artisan optimize:clear
	@cd frontend && npm run build

clearCache: ## to clear the cache
	@echo "cache clear"
	@cd backend && php artisan cache:clear && php artisan config:cache && php artisan route:clear

queueWork: #start queues command
	@echo "queue:work"
	@cd backend && php artisan queue:work

scheduleWork: ##
	@echo "schedule:work"
	@cd backend && php artisan schedule:work

