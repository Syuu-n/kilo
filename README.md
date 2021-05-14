# Project Kilo
![kilo](https://user-images.githubusercontent.com/60782728/114390704-8ebaa980-9bd1-11eb-8c1a-f1bb954dcb5a.png)

# System
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

# Login
![login](https://user-images.githubusercontent.com/60782728/114392630-01c51f80-9bd4-11eb-842a-d4dc19c8a8d7.png)

# Profile
![profile](https://user-images.githubusercontent.com/60782728/114393095-9cbdf980-9bd4-11eb-8d03-98917b6d1033.png)

# Schedule
![schedule](https://user-images.githubusercontent.com/60782728/114392922-62545c80-9bd4-11eb-9d79-c35f42cf2ea4.png)

# Users
![users](https://user-images.githubusercontent.com/60782728/114393045-8ca61a00-9bd4-11eb-877a-e22bbdac9cae.png)