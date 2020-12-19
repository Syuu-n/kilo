# Project Kilo

- Ruby 2.7.0
- Rails 6.0.2.2
- MySQL 5.7
- React 16.13.1
- Typescript 3.9.3

# Setup

```
$ git clone https://github.com/Aura-n/kilo.git

(Get master.key before build)
$ docker-compose build
$ docker-compose run --rm backend rails db:create
$ docker-compose run --rm backend rails db:migrate
```

# Usage
```
$ docker-compose up -d
```

# Create seed data
```
$ docker-compose exec backend bash
$ rails db:seed_fu
```

# Test(Backend)
```
$ docker-compose exec backend bash
$ rspec
```
