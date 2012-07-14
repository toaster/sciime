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
        widget_list.forEach(function(widget_data) {
          self.load_widget(widget_data.filename).done(function(widget_html) {
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

            if (carousel.find('.item').length === widget_list.length) {
              self.init_widgets();
            }
          });
        });
      });

      self.load_widget_list();
    },

    init_widgets: function() {
      var self = this;
      var carousel = $('.carousel');
      carousel.carousel({interval: self.configuration.slide_interval});
      carousel.bind('slid', function(event) {
        var widget_data = $(event.target).find('.active').data('widget');
      });
      $('body').trigger('widgets_initialized');
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
