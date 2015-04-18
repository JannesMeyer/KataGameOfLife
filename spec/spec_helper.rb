Dir["#{File.dirname(__FILE__)}/../kata/**/*.rb"].each do |ruby_file|
  require ruby_file
end

RSpec.configure do |config|
  config.color = true
end

