Gem::Specification.new do |s|
  s.name        = 'sciime'
  s.version     = '0.1.5'
  s.summary     = "Your favorite dashboard!"
  s.description = "With sciime you can easily create a dashboard for your company or personal projects that displays your most valuable information."
  s.authors     = ["Falk Köppe", "Ben Zimmer"]
  s.email       = 'hello@scii.me'
  s.files       = Dir.glob("{app,bin,lib,public}/**/*") + %w(LICENSE README.md)
  s.test_files  = Dir.glob("{spec}/**/*")
  s.executables = ['sciime']
  s.homepage    = 'http://scii.me'

  s.add_runtime_dependency 'sinatra', '1.3.2'
  s.add_runtime_dependency 'sinatra-contrib', '1.3.1'
  s.add_runtime_dependency 'thin', '1.4.1'
  s.add_runtime_dependency 'haml', '3.1.6'
  s.add_runtime_dependency 'activesupport', '3.2.6'
  s.add_runtime_dependency 'json', '1.7.3'
  s.add_runtime_dependency 'rake', '0.9.2.2'

  s.add_development_dependency 'pry'
  s.add_development_dependency 'shotgun'
  s.add_development_dependency 'webmock'
  s.add_development_dependency 'rspec'
end
