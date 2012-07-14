require 'sinatra/reloader' if development?
require 'net/https'

class Sciime < Sinatra::Base

  get '/' do
    haml :index
  end

  get '/widget-list' do
    Dir['public/widgets/*.html'].map do |file|
      File.basename(file, '.html').underscore.camelize
    end
  end

  get '/proxy/:url' do |url|
    get_file_content(url)
  end

  private

  def get_file_content(url)
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.open_timeout = 4
    http.read_timeout = 4

    if uri.scheme == 'https'
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    end

    request = http.get(uri.request_uri)
    request.body
  end

end
