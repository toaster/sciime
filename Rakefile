require 'rspec/core/rake_task'
require 'cucumber'
require 'cucumber/rake/task'

Cucumber::Rake::Task.new(:cucumber)
RSpec::Core::RakeTask.new(:rspec)

task :all do |t|
  Rake::Task['rspec'].invoke
  Rake::Task['cucumber'].invoke
end

task :default => :rspec
