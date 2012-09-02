require 'rspec/core/rake_task'
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new do |t|
  opts += %w{--tags ~@fails-on-travis} if ENV['TRAVIS']
  t.cucumber_opts = opts
end

RSpec::Core::RakeTask.new(:rspec)

task :all do |t|
  Rake::Task['rspec'].invoke
  Rake::Task['cucumber'].invoke
end

task :default => :rspec
