(function($) {

  Sciime = {
    configuration: {
      slide_interval: 2000,
      list_url: '/widget-list'
    },

    widget_configuration : {

    },

    init: function() {
      var self = this;
      $('body').bind('widgets_loaded', function(event, widget_list) {
        self.add_widgets(widget_list);
      });

      self.load_widget_list();
    },

    add_widgets: function(widget_list) {
      var self = this;
      var index = 0;
      widget_list.forEach(function(widget_data) {
        self.render_widget(widget_data).done(function() {
          if ($('.carousel').find('.item').length === widget_list.length) {
            self.init_widgets();
          }
          eval(widget_data.namespace).configuration.index = index;
          self.render_widget_navigation(widget_data);
          index++;
        });
      });
    },

    render_widget_navigation: function(widget_data) {
      var widget_data = eval(widget_data.namespace).configuration;
      var widget_title = widget_data.title;
      var item = $('<li>').data('widget-index', widget_data.index).append($('<a>').attr('href', '#').text(widget_title));

      item.find('a').click(function(event) {
        var parent = $(this).parent('li');
        parent.addClass('active').siblings().removeClass('active');
        var slide_number = item.data('widget-index');
        $('.carousel').carousel('pause').carousel(slide_number);
      });

      $('#widget-navigation').append(item);
    },

    render_widget: function(widget_data) {
      var self = this;
      return self.load_widget(widget_data.filename).done(function(widget_html) {
        var item = $('<div>').addClass('item');
        var widget_header = $('<div>').addClass('hero-unit');
        item.append(widget_html);

        var carousel = $('.carousel-inner');
        carousel.append(item);

        var widget_configuration = eval(widget_data.namespace).configuration;
        widget_configuration.filename = widget_data.filename;
        widget_configuration.namespace = widget_data.namespace;

        var widget_title = $('<h1>').text(widget_configuration.title);
        var widget_subtitle = $('<p>').text(widget_configuration.subtitle);

        widget_header.append(widget_title);
        widget_header.append(widget_subtitle);
        item.prepend(widget_header);
        item.data('widget', widget_configuration);
      });
    },

    init_widgets: function() {
      var self = this;
      var carousel = $('.carousel');
      carousel.carousel({interval: self.configuration.slide_interval});
      var first_widget_data = carousel.find('.item:first').data('widget');
      eval(first_widget_data.namespace).init();

      carousel.bind('slid', function(event) {
        var current_widget = $(event.target).find('.active');
        var next_widget = current_widget.next();
        if (next_widget.length) {
          var widget_data = next_widget.data('widget');
        } else {
          var widget_data = first_widget_data;
        }
        eval(widget_data.namespace).init();

        self.change_active_navigation(current_widget)
      });
      $('body').trigger('widgets_initialized');
    },

    change_active_navigation: function(current_widget) {
      var slide_number = current_widget.data('widget').index;
      $('#widget-navigation').find('li').eq(slide_number).addClass('active').siblings().removeClass('active');
    },

    load_widget_list: function() {
      var self = this;

      $.ajax({
        url: self.configuration.list_url,
        dataType: 'json'
      }).done(function(data) {
        $('body').trigger('widgets_loaded', [data]);
      });
    },

    load_widget: function(filename) {
      var self = this;

      return $.ajax({
        url: '/widgets/' + filename + '.html'
      });
    },

    proxy: function(url, callback) {
      $.ajax({
        url: '/proxy/' + encodeURIComponent(url)
      }).done(function(data) {
        callback(data);
      });
    }
  };

  $(function() {
    Sciime.init();
  });

})(jQuery);
