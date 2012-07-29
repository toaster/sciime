require_relative 'spec_helper'

describe 'Sciime' do

  def app
    Sciime
  end

  describe 'get /' do

    it 'serves the homepage' do
      get '/'

      last_response.should be_ok
    end

  end

  describe 'get /proxy/:url' do

    it 'returns proxy url body' do
      url = 'http://www.example.com'
      body = 'test'

      stub_request(:any, url).to_return(:body => body)

      get "/proxy/#{CGI.escape(url)}"

      last_response.body.should eq(body)
    end

  end

  describe 'get /widget-list' do

    it 'returns widget information as json' do
      get '/widget-list', {}, { 'HTTP_ACCEPT' => 'application/json' }

      json = JSON.parse(last_response.body)

      json.should be_a(Enumerable)
    end

    it 'returns not found for requests without application/json in the ACCEPT header' do
      get '/widget-list'

      last_response.status.should eq(404)
    end

  end

  describe 'get /widgets/:name' do

    it 'returns template body' do
      get '/widgets/widget-example.haml'

      last_response.should be_ok
      last_response.body.should_not be_empty
    end

    it 'returns not found if template does not exist' do
      get '/widgets/does-not-exist'

      last_response.status.should eq(404)
    end

  end

end
