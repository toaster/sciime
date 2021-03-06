(function($) {

  _Sciime = {
    configuration: {
      interval: 10000,
      listUrl: '/widget-list'
    },

    init: function() {
      var self = this;

      $('body').bind('widgetsLoaded', function(event, widgetList) {
        self.addWidgets(widgetList);
      });

      self.loadWidgetList();

      self.initPlayPauseButton();
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
      var item = $('<li>').addClass('nav-item').data('widget-index', configuration.index).append(link);

      link.click(function(event) {
        event.preventDefault();

        var parent = $(this).parent('li');
        self.activateLink(parent);

        self.carouselPause();
        $('#widget-navigation .s-icon-play').addClass('clicked');

        self.carouselAt(configuration.index);
      });

      $('#widget-navigation').append(item);
    },

    activateLink: function(element) {
      element.addClass('active');
      element.siblings().removeClass('active');
    },

    carouselPlay: function() {
      $('#widget-navigation .s-icon-play').show();
      $('#widget-navigation .s-icon-pause').hide();

      return $('.carousel').carousel();
    },

    carouselPause: function() {
      $('#widget-navigation .s-icon-play').hide();
      $('#widget-navigation .s-icon-pause').show();

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

      return self.loadWidget(widgetData.filename).done(function(content) {
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

      var firstWidget = carousel.find('.item:first');
      self.initWidget(firstWidget)

      carousel.bind('slid', function(event) {
        var currentWidget = $(event.target).find('.active');
        var nextWidget = currentWidget.next();

        self.afterActivateWidget(currentWidget);
        self.initWidget(nextWidget.length ? nextWidget : firstWidget);

        self.changeActiveNavigation(self, currentWidget)
      });

      $('body').trigger('widgetsInitialized');
    },

    initWidget: function(widget) {
      eval(widget.data('widget').namespace).init();

      widget.find('img.refresh').each(function() {
        if (typeof $(this).data('src') === "undefined") {
          $(this).data('src', this.src);
        }
        this.src = $(this).data('src') + "?timestamp=" + new Date().getTime();
      });
    },

    afterActivateWidget: function(widget) {
      if (typeof widget.data('iframes_loaded') === "undefined") {
        widget.find('iframe').each(function() {
          this.src = this.src;
        });
        widget.data('iframes_loaded', true);
      }
    },

    changeActiveNavigation: function(self, currentWidget) {
      var index = currentWidget.data('widget').index;
      var item = $('#widget-navigation').find('.nav-item').eq(index)

      self.activateLink(item);
    },

    loadWidgetList: function() {
      var self = this;

      $.ajax({
        url: self.configuration.listUrl,
        dataType: 'json'
      }).done(function(data) {
        $('body').trigger('widgetsLoaded', [data]);
      });
    },

    loadWidget: function(filename) {
      var self = this;

      return $.ajax({
        url: '/widgets/' + filename
      });
    },

    initPlayPauseButton:function() {
      var self = this;

      var playButton = $('#widget-navigation .s-icon-play');
      var pauseButton = $('#widget-navigation .s-icon-pause');
      pauseButton.hide();

      $('.carousel-inner').on('hover', function() {
        if (!playButton.hasClass('clicked')) {
          playButton.toggle();
          pauseButton.toggle();
        }
      });

      playButton.on('click', function(event) {
        event.preventDefault();

        self.carouselPause();
        playButton.toggleClass('clicked');
      });

      pauseButton.on('click', function(event) {
        event.preventDefault();

        self.carouselPlay();
        playButton.toggleClass('clicked');
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

  /* Public API */
  Sciime = {
    proxy: _Sciime.proxy
  };


  $(function() {
    _Sciime.init();
  });

})(jQuery);
