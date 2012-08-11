require 'aruba/api'
require 'aruba/cucumber/hooks'

World(Aruba::Api)

When /^I run "([^"]*)"$/ do |cmd|
  run_interactive(unescape(cmd))
end
