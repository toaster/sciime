require 'bundler/setup'
Bundler.require(:default, ENV['RACK_ENV'])

require './lib/sciime'
run Sciime
