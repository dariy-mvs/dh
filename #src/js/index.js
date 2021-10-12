$( document ).ready( () => {
  $( '.hamburger' ).on( 'click', function() {
    if ( !$( this ).hasClass( 'is-active' ) ) {
      $( this ).addClass( 'is-active' );
      $( '.header__nav_list' ).fadeIn( 500 );
    } else {
      $( this ).removeClass( 'is-active' );
      $( '.header__nav_list' ).fadeOut( 500 );
    }
  } );

  // slider в header

  $( '.header__slider' ).slick( {
    dots: true,
    dotsClass: 'header__slider_dots'
  } );

  // показ поля для поиска

  $( '.search_btn' ).on( 'click', () => {
    $( '.search_field' ).show( 'slow' );
  } );

  // пагинация меню

  function pagination( parentSelector, itemSelector, itemPage ) {
    const items = $( `${parentSelector} ${itemSelector}` );
    const numItems = items.length;
    const perPage = itemPage;

    items.slice( perPage ).hide();
    $( '.pagination-container' ).pagination( {
      items: numItems,
      itemsOnPage: perPage,
      prevText: '&laquo;',
      nextText: '&raquo;',
      onPageClick( pageNumber ) {
        const showFrom = perPage * ( pageNumber - 1 );
        const showTo = showFrom + perPage;
        items.hide().slice( showFrom, showTo ).show();
        $( 'html, body' ).animate( { scrollTop: 0 }, 100 );
      }
    } );
  }

  pagination( '.submenu__catalogPdf_list', '.submenu__catalogPdf_item', 3 );
  pagination( '.submenu__news_list', '.submenu__news_item', 1 );
  // pagination( '.catalog__list', '.catalog__item', 5 );

} );
