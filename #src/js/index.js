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
  centerMode: false,
  focusOnSelect: true
}); 

let productTabs = document.querySelector('.product__tabs_list');

if (productTabs) {
  productTabs.addEventListener('click', (e) => {
    let target = e.target.closest('.product__tabs_item');
    if (!target) { return; };
    document.querySelector('.active-tab').classList.remove('active-tab');
    document.querySelector('.active-tab-content').classList.remove('active-tab-content');
    let dataName = target.dataset.tab;
    document.querySelector(`[data-tab-cont=${dataName}]`).classList.add('active-tab-content');
    target.classList.add('active-tab');
  });
}

let popup = document.querySelector('.popup__box'); 
if (popup) {
  popup.addEventListener('click', (e) => {
    let target = e.target;
    if (!target.closest('.popup') || target.classList.contains('close_btn')) {
      document.querySelector('.popup__box').classList.add('popup_hidden');
    }
  });
}


$('.visual__variant_list').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: false,
  arrows: true,
  centerMode: false,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}); 

let portfolioList = document.querySelector('.portfolio__list');
let portfolioItemArr = [...document.querySelectorAll('.portfolio__item')];
let portfolioProjectsArr = [...document.querySelectorAll('.portfolio__photo_project')];

if (portfolioList) { 
  portfolioItemArr.forEach((el, ind) => {
    if (ind > 4) {
      el.classList.add('hidden');
    }
  });
  portfolioProjectsArr.forEach((el, ind) => {
    if (ind > 2) {
      el.classList.add('hidden');
    }
  });
}

  // popup для портфолио

  function popupImg( selector ) {
    $( selector ).magnificPopup( {
      delegate: 'img',
      type: 'image',
      gallery: {
        enabled: true
      },
      callbacks: {
        elementParse( itemImg ) {
          const elem = itemImg;
          elem.src = elem.el.attr( 'src' );
        }
      }
    } );
  }


function showMoreEvent (parentSelector, itemSelector, showItemCounter) {
  document.querySelector(`${parentSelector} .showMore`).addEventListener('click', () => {
    let hiddenArr = [...document.querySelectorAll(`${parentSelector} .hidden`)];
    let moreBtn = document.querySelector(`${parentSelector} .showMore`);
    if (hiddenArr.length) {
      hiddenArr.forEach((el, ind) => {
        if (ind <= showItemCounter) {
          el.classList.remove('hidden');
        }
      });
      hiddenArr.length <= showItemCounter ? moreBtn.classList.add('emptyHidden') : "";
    } else {
      moreBtn.classList.add('emptyHidden');
    }
  });
}
if (portfolioList) {
  showMoreEvent('.portfolio__list_wrapper', '.portfolio__item', 4);
  showMoreEvent('.portfolio__photo_projectsWrapper', '.portfolio__item', 2);
  popupImg('.portfolio__photos_list');
}


// пагинация для портфолио

function pagination( parentSelector, itemSelector, itemPage, withScroll = false ) {
  const items = $( `${parentSelector} ${itemSelector}` );
  const numItems = items.length;
  const perPage = itemPage;

  items.slice( perPage ).hide();
  $( '.pagination-container' ).pagination( {
    items: numItems,
    itemsOnPage: perPage,
    prevText: '<',
    nextText: '>',
    onPageClick( pageNumber ) {
      const showFrom = perPage * ( pageNumber - 1 );
      const showTo = showFrom + perPage;
      items.hide().slice( showFrom, showTo ).show();
      if (withScroll) {
        $( 'html, body' ).animate( { scrollTop: 0 }, 100 );
      }
    }
  } );
}

pagination('.project__fullList', '.project__fullList_item', 20);
if (portfolioList) {
document.querySelector('.pagination_counter_box').addEventListener('click', (e) => {
  let target = e.target;
  if (target.classList.contains('pagination_count')) {
    document.querySelector('.active-count').classList.remove('active-count');
    let count = +target.dataset.countItem;
    pagination('.project__fullList', '.project__fullList_item', count);
    target.classList.add('active-count');
  }
});
}
$('.portfolioItem__slider').slick({  
  dots: true,
  arrows: true,
  dotsClass: 'portfolioItem_dots'
});

$('.history__photo_slider').slick({  
  dots: true,
  arrows: true,
  dotsClass: 'portfolioItem_dots'
});

if (document.querySelector('.newsItem_img')) {
  popupImg('.colorBlock_imgBox');
  popupImg('.newsItem_imgBox');
}

} );
