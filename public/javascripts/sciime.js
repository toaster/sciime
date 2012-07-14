(function($) {

  Sciime = {
    widget_list: [

    ],

    configuration: {
      timeout: 4000,
      list_url: '/widget-list',
      replacements: {
        content: '#widget-content',
        title: '#widget-title',
        subtitle: '#widget-subtitle'
      }
    },

    widget_configuration : {

    },

    init: function() {
      this.load_widget_list();
      this.loop_widgets();
    },

    loop_widgets: function(widget_list) {
      var self = this;
      var widget_count = 0;

      setInterval(function() {
        self.load_widget(self.widget_list[widget_count]);

        widget_count++;
        widget_count = widget_count % self.widget_list.length
      }, self.configuration.timeout)
    },

    load_widget_list: function() {
      var self = this;

      $.ajax({
        url: self.configuration.list_url,
        async: false
      }).done(function(data) {
        self.widget_list = jQuery.parseJSON(data);
      });
    },

    load_widget: function(slide) {
      var self = this;

      $.ajax({
        url: '/widgets/' + slide
      }).done(function(data) {
        self.widget_configuration.content = data;

        $.each(self.configuration.replacements, function(key, value) {
          $(value).html(self.widget_configuration[key]);
        });
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