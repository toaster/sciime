# sciime ['ski:m]

Your favorite dashboard!

With *sciime* you can easily create a dashboard for your company or personal projects that displays your most valuable information. Simply create a new widget and place it in *sciime*s widget folder to extend your dashboard. Widgets can be plain HTML, ERB or HAML files mixed with Javascript. See [widget-example.haml][example] for a starting point.

[example]: https://github.com/sciime/sciime/blob/master/views/widgets/widget-example.haml "Sciime Example Widget"

## How to start the application

In production, start the rack application.

    rackup -p 4567 -E production

In development, use shotgun to reload the application on every request.

    shotgun -p 4567

## Changelog

### 2012-07-15

* UI for play-/pause
* [Tilt](https://github.com/rtomayko/tilt) template support for widgets
* added rspec, main application tests and Rakefile to run all tests
