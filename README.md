# Project Kilo

- Ruby 2.7.0
- Rails 6.0.2.2
- MySQL 5.7
- React 16.13.1
- Typescript 3.9.3

# Setup

```
$ git clone https://github.com/NobuhiroKato/kilo.git

$ docker-compose run frontend yarn
$ docker-compose run backend rake db:create
```

# Usage
```
$ docker-comppose up -d
```

# Test
```
$ docker-compose exec backend bash
$ rspec
```
