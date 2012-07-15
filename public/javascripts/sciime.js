(function($) {

  Sciime = {
    configuration: {
      interval: 2000,
      listUrl: '/widget-list'
    },

    init: function() {
      var self = this;

      $('body').bind('widgets_loaded', function(event, widgetList) {
        self.addWidgets(widgetList);
      });

      self.loadWidgetList();
    },

    addWidgets: function(widgetList) {
      var self = this;
      var index = 0;

      widgetList.forEach(function(widgetData) {
        self.renderWidget(widgetData).done(function() {
          if (self.carouselLength() === widgetList.length) {
            self.initWidgets();
          }

          self.widgetConfiguration(widgetData.namespace).index = index;
          self.addNavigationItem(widgetData.namespace);

          index++;
        });
      });
    },

    addNavigationItem: function(widgetName) {
      var self = this;

      var configuration = self.widgetConfiguration(widgetName);

      var link = $('<a>').attr('href', '#').text(configuration.linkTitle || configuration.title);
      var item = $('<li>').data('widget-index', configuration.index).append(link);

      link.click(function(event) {
        event.preventDefault();

        var parent = $(this).parent('li');
        self.activateLink(parent);

        self.carouselPause();
        self.carouselAt(configuration.index);
      });

      $('#widget-navigation').append(item);
    },

    activateLink: function(element) {
      element.addClass('active');
      element.siblings().removeClass('active');
    },

    carouselPause: function() {
      return $('.carousel').carousel('pause');
    },

    carouselAt: function(index) {
      return $('.carousel').carousel(index)
    },

    carouselLength: function(index) {
      return $('.carousel').find('.item').length;
    },

    carouselAddSlide: function(slide) {
      var carousel = $('.carousel-inner');

      carousel.append(slide);
    },

    widgetConfiguration: function(name) {
      return eval(name).configuration;
    },

    renderWidget: function(widgetData) {
      var self = this;

      return self.load_widget(widgetData.filename).done(function(content) {
        var item = $('<div>').addClass('item');
        var header = $('<div>').addClass('hero-unit');
        var title = $('<h1>');
        var description = $('<p>');

        header.append(title);
        header.append(description);
        item.append(header);
        item.append(content);

        var configuration = self.widgetConfiguration(widgetData.namespace);
        configuration.filename = widgetData.filename;
        configuration.namespace = widgetData.namespace;

        title.text(configuration.title);
        description.text(configuration.description);
        item.data('widget', configuration);

        self.carouselAddSlide(item);
      });
    },

    initWidgets: function() {
      var self = this;

      var carousel = $('.carousel');
      carousel.carousel({
        interval: self.configuration.interval
      });

      var first_widgetData = carousel.find('.item:first').data('widget');
      self.initWidget(first_widgetData.namespace)

      carousel.bind('slid', function(event) {
        var current_widget = $(event.target).find('.active');
        var next_widget = current_widget.next();

        if (next_widget.length) {
          var widgetData = next_widget.data('widget');
        } else {
          var widgetData = first_widgetData;
        }

        self.initWidget(widgetData.namespace);

        self.changeActiveNavigation(self, current_widget)
      });

      $('body').trigger('widgets_initialized');
    },

    initWidget: function(name) {
      eval(name).init();
    },

    changeActiveNavigation: function(self, current_widget) {
      var index = current_widget.data('widget').index;
      var item = $('#widget-navigation').find('li').eq(index)

      self.activateLink(item);
    },

    loadWidgetList: function() {
      var self = this;

      $.ajax({
        url: self.configuration.listUrl,
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
