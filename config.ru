require 'bundler/setup'
Bundler.require(:default, ENV['RACK_ENV'])

require './sciime'
run Sciime
