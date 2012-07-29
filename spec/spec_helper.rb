require 'bundler/setup'
Bundler.require(:default, :development, :test)

require 'rack/test'
require 'webmock/rspec'
require_relative '../lib/sciime'

set :environment, :test

RSpec.configure do |config|
  config.include Rack::Test::Methods
end
