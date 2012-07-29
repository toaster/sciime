# sciime ['ski:m]

Your favorite dashboard!

With **sciime** you can easily create a dashboard for your company or personal projects that displays your most valuable information. Simply create a new widget and place it in **sciime**s widget folder to extend your dashboard. Widgets can be plain HTML, ERB or HAML files mixed with Javascript. See [widget-example.haml][example] for a starting point.

[example]: https://github.com/sciime/sciime/blob/master/views/examples/widget-example.haml "Sciime Example Widget"

## Making your own dashboard

Create directory

    mkdir my-dashboard
    cd my-dashboard

Create gemfile with the following contents

    source :rubygems
    gem 'sciime', '0.1.2'

Install bundle

    bundle install

Create widget dir

    mkir widgets

Add widgets to the directory and start sciime

    sciime

## Development, Tests and Contribution

It is very easy to contribute to the project. First, fork the project and clone the code, then make sure all tests are passing and then you can make your changes. Please contribute to the main project by creating a feature branch. When you have finished your changes then issue a pull request.

Run all tests:

    bundle exec rake

Start the development server:

    bundle exec shotgun -p 4567

## Changelog

### 2012-07-29

* Make sciime usable as a gem

### 2012-07-17

* moved example widgets into example folder to keep the widgets folder clean by default

### 2012-07-15

* UI for play-/pause
* [Tilt](https://github.com/rtomayko/tilt) template support for widgets
* added rspec, main application tests and Rakefile to run all tests
