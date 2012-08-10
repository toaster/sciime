require 'aruba/cucumber'

Before do
  @aruba_timeout_seconds = 10
end

After do
  terminate_processes!
end

ENV['PATH'] = "#{File.expand_path(File.dirname(__FILE__) + '/../../bin')}#{File::PATH_SEPARATOR}#{ENV['PATH']}"
