var map = require('./components/map');

window.addEventListener('load', function() {
  "use strict";

  FastClick.attach(document.body);
}, false);

(function($, L, Modernizr, FastClick, window){
  "use strict";

  // Global scope for components
  window.components = {};
  window.components.map = new map();

  $(document).ready(function(){

    /**
     * Initialise components
     */
    if( $('.media__list').length ){
      window.components.frame.init( $('.media__list') );
    }

    if($('#map').length){
      window.components.map.init();
    }

    $(window).on('mapinteractionstart', function(){
      $('.discovery-search__container--filters').removeClass('is-hidden');
      $('.discovery-search__container--info').addClass('is-hidden');
    });

    $('.discovery-search__form').on('submit', function(event){
      event.preventDefault();
      $(window).trigger('mapinteractionstart');

      var queryText = $('.discovery-search__input--text-field').val();

      if($.trim(queryText)){
        $(window).trigger('locationsearch', $.trim(queryText));
      }
    });

    $('.header__mobile-menu-link').on('click', function(event){
      event.preventDefault();

      $(this).toggleClass('is-active');
      $('body').toggleClass('mobile-nav_is-open');
    });

    $('.discover-search__dismiss').on('click', function(event){
      event.preventDefault();

      $('.discovery-search__container--info').addClass('is-hidden');
    });

    $('.discover--results__view-list-link, .map-cards__toggle-list-view-link').on('click', function(event){
      event.preventDefault();

      $('.discover-map').toggleClass('list-view');
    });

    $(window).on('locationsearch', function(){
      $('body').removeClass('mobile-nav_is-open');
      $('.header__mobile-menu-link').removeClass('is-active');
    });

    $(window).on('markersappended', function(event, data){
      $('.discover--results__count').text(data.fetchedData.length);
    });

  });

})(jQuery, L, Modernizr, FastClick, window);
