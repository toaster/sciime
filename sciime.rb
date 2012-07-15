require 'net/https'

class Sciime < Sinatra::Base

  # Register "html" extension to transparently handle plain html templates.
  Tilt.register Tilt::ERBTemplate, 'html'

  configure do
    set :widget_dir, "#{settings.views}/widgets"
  end

  get '/' do
    haml :index
  end

  get '/widget-list', :provides => :json do
    widgets = Dir["#{settings.widget_dir}/*"].map do |file|
      {
        filename: File.basename(file),
        namespace: File.basename(file, '.*').underscore.camelize
      }
    end

    widgets.to_json
  end

  get '/widgets/:name' do |name|
    begin
      Tilt.new("#{settings.widget_dir}/#{name}").render
    rescue Errno::ENOENT
      404
    end
  end

  get '/proxy/:url' do |url|
    get_file_content(url)
  end

  private

  def get_file_content(url)
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)

    if uri.scheme == 'https'
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    end

    request = http.get(uri.request_uri)
    request.body
  end

end