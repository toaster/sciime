# sciime ['ski:m]

Your favorite dashboard!

With *sciime* you can easily create a dashboard for your company or personal projects that displays your most valuable information. Simply create a new widget and place it in *sciime*s widget folder to extend your dashboard. Widgets can be plain HTML, ERB or HAML files mixed with Javascript. See [widget-example.haml][example] for a starting point.

[example]: https://github.com/sciime/sciime/blob/master/views/widgets/widget-example.haml "Sciime Example Widget"

## How to start the application

The application is based on [Sinatra](https://github.com/sinatra/sinatra), so you can start the production server, by simply running:

    git clone git@github.com:sciime/sciime.git sciime
    cd sciime
    rackup -p 4567 -E production

Two example widgets are provided, but you probably want to add your own widgets to `/views/widgets`.

## Development, Tests and Contribution

It is very easy to contribute to the project. First, fork the project and clone the code, then make sure all tests are passing and then you can make your changes. Please contribute to the main project by creating a feature branch. When you have finished your changes then issue a pull request.

Run all tests:

    bundle exec rake

Start the development server:

    bundle exec shotgun -p 4567

## Changelog

### 2012-07-15

* UI for play-/pause
* [Tilt](https://github.com/rtomayko/tilt) template support for widgets
* added rspec, main application tests and Rakefile to run all tests
