FROM ruby:2.7.0
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev node.js \
  locales locales-all && \
  echo "ja_JP.UTF-8 UTF-8" > /etc/locale.gen && \
  locale-gen && \
  update-locale LANG=ja_JP.UTF-8
RUN apt-get install -y vim
RUN mkdir -p /myapp/backend
WORKDIR /myapp/backend
COPY Gemfile /myapp/backend/Gemfile
COPY Gemfile.lock /myapp/backend/Gemfile.lock
RUN bundle install
COPY . /myapp/backend

# Set timezone to Asia/Tokyo
ENV LANG="ja_JP.UTF-8" \
    TZ='Asia/Tokyo'

ENV ENTRYKIT_VERSION 0.4.0
RUN wget https://github.com/progrium/entrykit/releases/download/v${ENTRYKIT_VERSION}/entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz \
  && tar -xvzf entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz \
  && rm entrykit_${ENTRYKIT_VERSION}_Linux_x86_64.tgz \
  && mv entrykit /bin/entrykit \
  && chmod +x /bin/entrykit \
  && entrykit --symlink

ENTRYPOINT [ \
  "prehook", "ruby -v", "--", \
  "prehook", "/myapp/backend/prehook", "--"]
