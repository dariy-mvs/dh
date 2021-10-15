$( document ).ready( () => {
  $( '.hamburger' ).on( 'click', function() {
    if ( !$( this ).hasClass( 'is-active' ) ) {
      $( this ).addClass( 'is-active' );
      $( '.header__menu' ).fadeIn( 500 );
    } else {
      $( this ).removeClass( 'is-active' );
      $( '.header__menu' ).fadeOut( 500 );
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
    let newsItems = [...document.querySelectorAll('.submenu__news_item')].length - 1;
    let newsWidth = document.querySelector('.submenu__news_item').clientWidth;
    console.log(newsWidth);
    let offset = parseInt(newsList.style.left, 10) || 0;
    console.log(offset);

    if (this.btn === 'next') {
      offset <= -newsWidth * newsItems ? newsList.style.left = 0 + 'px' :  newsList.style.left = offset - newsWidth + 'px';
    } else if (this.btn === 'prev') {
      offset === 0 ? newsList.style.left = -newsWidth * newsItems + 'px' :  newsList.style.left = offset + newsWidth + 'px';
    }
  }
  
  document.querySelector('.pagination_news_next').addEventListener('click', {handleEvent: getNextSlide, btn: 'next'});
  document.querySelector('.pagination_news_prev').addEventListener('click', {handleEvent: getNextSlide, btn: 'prev'});

  // открытие сабменю
  if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) ) {
    // $( '.catalog-home__chapter_descr' ).each( function() {
    //   $( this ).addClass( 'chapterMobile' );
    // } );

    // переходить по ссылке только после открытия меню
    $( '.header__menu_item' ).on( 'click', ( evt ) => {
      const target = evt.target.closest( '.header__menu_item' );
      const subMenu = [ ...target.children ].find( ( el ) => el.classList.contains( 'submenu' ) );
      if ( subMenu ) {
        if ( !target.classList.contains( 'active_menu' ) ) {
          evt.preventDefault();
          target.classList.add( 'active_menu' );
        } else {
          target.classList.remove( 'active_menu' );
        }
      }
    } );
  }

    // slider в header

    $( '.sertificate__list' ).slick( {
      dots: true,
      dotsClass: 'sertificate__list_dots',
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    } );

// слайдер для товара каталога

$('.product__bigSlider').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  fade: true,
  asNavFor: '.product__smSlider'
});
$('.product__smSlider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.product__bigSlider',
  dots: false,
  arrows: true,
  centerMode: true,
  focusOnSelect: true
}); 

document.querySelector('.product__tabs_list').addEventListener('click', (e) => {
  let target = e.target.closest('.product__tabs_item');
  if (!target) { return; };
  document.querySelector('.active-tab').classList.remove('active-tab');
  document.querySelector('.active-tab-content').classList.remove('active-tab-content');
  let dataName = target.dataset.tab;
  document.querySelector(`[data-tab-cont=${dataName}]`).classList.add('active-tab-content');
  target.classList.add('active-tab');
});

document.querySelector('.popup__box').addEventListener('click', (e) => {
  let target = e.target;
  if (!target.closest('.popup') || target.classList.contains('close_btn')) {
    document.querySelector('.popup__box').classList.add('popup_hidden');
  }
})

} );
