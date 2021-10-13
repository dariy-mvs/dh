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
      //prevText: '&laquo;',
      //nextText: '&raquo;',
      prevText: ' ',
      nextText: ' ',
      onPageClick( pageNumber ) {
        const showFrom = perPage * ( pageNumber - 1 );
        const showTo = showFrom + perPage;
        items.hide().slice( showFrom, showTo ).show();
        // $( 'html, body' ).animate( { scrollTop: 0 }, 100 );
      }
    } );
  }

  pagination( '.submenu__catalogPdf_list', '.submenu__catalogPdf_item', 3 );

  // переключение активной новости
  function getNextSlide(event) {
    console.log(this.btn);
    let newsList = document.querySelector('.submenu__news_list');
    let newsArr = [...document.querySelectorAll('.submenu__news_item')];
    let newsWidth = document.querySelector('.submenu__news_item').clientWidth;
    console.log(newsWidth);
    let offset = parseInt(newsList.style.left, 10) || 0;
    console.log(offset);
    if (this.btn === 'next') {
      offset <= -newsWidth * newsArr.length ? newsList.style.left = 0 :  newsList.style.left = offset - newsWidth + 'px';
    } else if (this.btn === 'prev') {
      offset >= newsWidth * newsArr.length ? newsList.style.left = 0 :  newsList.style.left = offset + newsWidth + 'px';
    }
  }
  
  document.querySelector('.pagination_news_next').addEventListener('click', {handleEvent: getNextSlide, btn: 'next'});
  document.querySelector('.pagination_news_prev').addEventListener('click', {handleEvent: getNextSlide, btn: 'prev'});


} );
