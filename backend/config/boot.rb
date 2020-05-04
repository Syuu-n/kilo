# TODO: Ruby 2.7 で現れる大量の Warning を非表示にする
# 有用な Warning も非表示にしてしまう可能性があり
Warning[:deprecated] = false

ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __dir__)

require 'bundler/setup' # Set up gems listed in the Gemfile.
require 'bootsnap/setup' # Speed up boot time by caching expensive operations.
