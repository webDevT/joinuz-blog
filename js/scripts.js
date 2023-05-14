$(function() {
  $(document)
    .on('click', '.accordion__title', function(e) {
      e.preventDefault();

      $(this).closest('.accordion__item').toggleClass('active');
    })
    .on('click', '.footer-nav__title', function(e) {
      $(this).next('.footer-nav__menu').toggleClass('active');
    })


    $('.trajectory__item-header').click(function(){
      $(this).toggleClass('active');
      $(this).parent().find('.trajectory__item-text').slideToggle();
    })


});
$(function() {
  const isDesctop = $(window).width() >= 1440;

  if ($('#bike').length) {
    const firtStepTime = isDesctop ? 3000 : 1800;
    const secondStepTime = 700;

    const $bike = $('#bike');
    const wrapperWidth = $('.wrapper').width();
    const bikeWidth = $bike.width();

    // init
    $('.main-header__title-wrap').css({
      width: wrapperWidth,
      left: -wrapperWidth,
    });

    // animation steps
    $('.main-header__overflow').animate({ width: wrapperWidth }, firtStepTime);
    $('.main-header__title-wrap').animate({ left: 0, }, firtStepTime);
    $bike.animate({ left: -bikeWidth }, firtStepTime, null, function() {
      $bike.css({ left: 'inherit', right: -bikeWidth }).promise().then(function() {
        isDesctop
          ? $(this).animate({ right: -bikeWidth / 3 }, secondStepTime)
          : $(this).animate({ right: -bikeWidth / 1.3 }, secondStepTime)
      });
    });
    setTimeout(function() {
      $bike.addClass('hat-splash');
    }, firtStepTime / 3)
  }

  if ($('.drow').length && isDesctop) {
    // drow lines animation
    $(window).scroll(function() {
      const T = $(window).scrollTop();
      const H = $(window).height();
  
      lineAnimation('#line_1');
      lineAnimation('#line_2'); 
      lineAnimation('#line_3', 'reverse');
      lineAnimation('#line_4', 'reverse');
      lineAnimation('#line_6', 'reverse');          
  
  
  
      function lineAnimation(svgSelector, direction) {
        const delta = H / 2;
        const $svg = $(svgSelector);
        const $drowPath = $svg.find('.drow');
        const startOffsetFrom = 0;
        const svgLength = $drowPath.get(0).getTotalLength();
        const sign = direction === 'reverse' ? -1 : 1;
  
        if($svg.length) {
          const t = $svg.offset().top;
          const h = $svg.height();
          let dashoffset = startOffsetFrom;
    
          if (T + delta < t) {
            dashoffset = startOffsetFrom;
          } else if (T + delta > t && T + delta < (t + h)) {
            dashoffset = svgLength / h * (T + delta - t);
          } else if (T + delta > (t + h)) {
            dashoffset = svgLength;
          }
  
          $drowPath.css({ 'stroke-dashoffset': dashoffset * sign, 'stroke-dasharray': svgLength });
        }
      }
    })
  }
});
$(function() {
  if ($(window).width() < 1240) {
    onViewChange(document.querySelector('[data-view="block"]'))
  }

  $(document).on('click', '.js-change-view a', function(e) {
    e.preventDefault();


    onViewChange(this)
  })

  function onViewChange(element) {
    $('[data-view]').removeClass('active');
    $(element).addClass('active')
    $('[view-type]').attr('view-type', $(element).attr('data-view'));
  }
});
$(function() {
  $(document)
    .on('click', '.js-show-password', function(e) {
      e.preventDefault();

      const $this = $(this);
      const $closestInput = $this.closest('div').find('input');

      $this.toggleClass('icon-eye icon-eye-closed');

      if ($closestInput.attr('type') === 'password') {
        $closestInput.attr('type', 'text');
      } else {
        $closestInput.attr('type', 'password');
      }
    })
    .on('change', '[data-depends-with]', function() {
      const dependedSelector = $(this).attr('data-depends-with');
      let isEmptyPresents = false;

      $(`[data-depends-with='${dependedSelector}']`).each(function(idx, item) {
        const value = $(item).val();

        if (value === '' || value === null) {
          isEmptyPresents = true;
        }
      })

      if (isEmptyPresents) {
        $(dependedSelector).removeClass('active');
      } else {
        $(dependedSelector).addClass('active');
      }
    })
    .on('change', '#homeContactForm select, #homeContactForm input', function() {
      let isEmptyPresents = false;

      $('#homeContactForm select, #homeContactForm input').each(function(idx, item) {
        const value = $(item).val();

        if (value === '' || value === null) {
          isEmptyPresents = true;
        }
      })

      if (isEmptyPresents) {
        $('#submitHomeContactForm').addClass('disabled');
      } else {
        $('#submitHomeContactForm').removeClass('disabled');
      }
    })
    .on('click', '.js-show-hidden-form[type="button"]', function(e) {
      e.preventDefault();

      $(this)
        .attr('type', 'submit')
        .closest('form').find('.hidden-form-fields').addClass('active')
    })
})
$(function() {
  $(document)
  .on('click', '[data-lightbox]', function(e) {
    const lightBoxID = '#' + $(this).attr('data-lightbox');

    $(lightBoxID).addClass('active');
  })
  .on('click', '.lightbox__close', function(e) {
    e.preventDefault();

    const $lightBox = $(this).closest('.lightbox');
    const lightBoxID = $lightBox.attr('id');

    $lightBox.removeClass('active');
    $('[data-lightbox=' + lightBoxID + ']').find('input[type=checkbox]').prop('checked', false);
  })
  // filter modal
  .on('click', '.js-show-filter', function(e) {
    e.preventDefault();

    $('.jo-overview-filter').addClass('active');
  })
  .on('click', '.jo-overview-filter__modal-close', function(e) {
    e.preventDefault();

    $('.jo-overview-filter').removeClass('active');
  })
});
// gif lazy load instead video

$(function() {
  if (Boolean(navigator.userAgent.indexOf('iPhone') + 1)) {
    const sliderMedia = $('.polaroid-slider__media')

    sliderMedia.find('video').css('display', 'none')
    $('.lazy-gif').Lazy()
  }

  // datepicker

  $.fn.datepicker.language['en'] = {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'mm/dd/yyyy',
    timeFormat: 'hh:ii aa',
    firstDay: 0,
  }

  $('.datepicker-input').datepicker({
    language: 'en',
    minView: 'months',
    view: 'months',
    dateFormat: 'MM yyyy',
  })
})

$(function() {
  jQuery.fn.reverse = [].reverse;

  // settings
  const $palaroidSlider = $('.polaroid-slider');
  const itemSelector = '.js-polaroid-slider-img'; // unic selector for polaroids
  const dotsSelector = '.polaroid-slider__dots';
  const userInfoSelector = '.user-card__info';

  if (!$palaroidSlider.length) {
    return false;
  }

  const methods = {
    _moveSlidesBeforeActive: function() {
      const $slides = $(itemSelector);
      const slidesNumber = $(itemSelector + '.active').index()
      
      $slides.each(function(idx, item) {
        if ($(item).hasClass('active')) {
          return false;
        }

        $(item).css({
          left: (slidesNumber - idx) * -50,
        })
      })
    },

    _moveSlidesAfterActive: function() {
      const $slides = $(itemSelector);
      const slidesNumber = $slides.length - $(itemSelector + '.active').index() - 1;

      $slides.reverse().each(function(idx, item) {
        if ($(item).hasClass('active')) {
          return false;
        }

        $(item).css({
          left: 500 + (slidesNumber - idx) * 160,
        })
      })
    },

    setActiveSlide: function($item) {
      $(itemSelector).removeClass('active');
      $item.addClass('active').css({ left: 0 });
      $(dotsSelector).find('span').eq(
        $(itemSelector + '.active').index()
      ).addClass('active').siblings().removeClass('active');
      $(userInfoSelector).removeClass('active').eq($(itemSelector + '.active').index()).addClass('active');

      this._moveSlidesBeforeActive();
      this._moveSlidesAfterActive();
    },

    nextSlide: function() {
      const $currentActive = $(itemSelector + '.active');
      const $nextItem = $currentActive.next();

      if ($nextItem.length) {
        this.setActiveSlide($nextItem)
      }
    },

    prevSlide: function() {
      const $currentActive = $(itemSelector + '.active');
      const $prevItem = $currentActive.prev();

      if ($prevItem.length) {
        this.setActiveSlide($prevItem)
      }
    }
  }

  // init
  $('.polaroid-slider .polaroid').each(function() {
    $(this).addClass(itemSelector.split('.')[1]);
  })

  $(itemSelector).each(function() {
    $(dotsSelector).append('<span></span>');
  }).promise().then(function() {
    methods.setActiveSlide(
      $palaroidSlider.find(itemSelector).first()
    );
    $(userInfoSelector).first().addClass('active');
  });

  $(document)
    .on('click', '.js-prev-slide', function(e) {
      e.preventDefault();
      methods.prevSlide()
    })
    .on('click', '.js-next-slide', function(e) {
      e.preventDefault();
      methods.nextSlide()
    })
    .on('click', dotsSelector + ' span', function(e) {
      e.preventDefault();

      methods.setActiveSlide(
        $(itemSelector).eq($(this).index())
      )

      $(this).addClass('active').siblings().removeClass('active');
    })
});

// job command slick slider

$('.job-command-slider__carousel').slick({
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: '<div class="job-command-slider__arrow job-command-slider__arrow_left"><i class="icon icon-arrow-left"></i></div>',
  nextArrow: '<div class="job-command-slider__arrow job-command-slider__arrow_right"><i class="icon icon-arrow-right"></i></div>',
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        dots: false,
        arrows: false,
      }
    }
  ]
});
$(function() {
  const isMobile = $(window).width() < 1440;
  const $stickyNavigation = $('.sticky-nav');
  const navLinkSelector = '.js-sticky-nav-trigger';
  const menuSelector = '.pulldown-nav__menu';

  window.onscroll = function() {
    const scrolled = $(window).scrollTop();
    const delta = 55;
    const toggledClass = 'sticky';

    if (scrolled > delta) {
      $stickyNavigation.addClass(toggledClass);
      $('.header-nav').addClass(toggledClass);
    } else {
      $stickyNavigation.removeClass(toggledClass);
      $('.header-nav').removeClass(toggledClass);
    }
  }

  /**
   * @param {object} $link
   * @param {object} $nav
   */
  function showNavigation($link, $nav) {
    $stickyNavigation.addClass('active');
    $link.addClass('active');
    $nav.addClass('active');
  }

  function hideAllNavigation() {
    $stickyNavigation.removeClass('active');
    $(navLinkSelector).removeClass('active');
    $(menuSelector).removeClass('active');
  }

  $(document)
    .on('click', navLinkSelector, function(e) {
      e.preventDefault();

      const $this = $(this);
      const isActive = $this.hasClass('active');

      hideAllNavigation();

      if(!isActive) {
        const menu = $this.attr('href').split('#')[1];

        showNavigation($this, $(`[data-sticky-nav="${menu}"]`))
      }
    })
    .on('mouseleave', '.sticky-nav', function() {
      hideAllNavigation();
    })
    .on('click', '.js-mobile-nav-trigger', function() {
      $(this).toggleClass('active');
      $stickyNavigation.toggleClass('active');
    })
    .on('click', '.pulldown-nav__mobile-link.parent', function(e) {
      e.preventDefault();

      const menu = $(this).attr('href').split('#')[1];

      $(`[data-sticky-nav="${menu}"]`).toggleClass('active');
    })
    .on('click', '.pulldown-nav__menu .parent a', function(e) {
      e.preventDefault();

      $(this).closest('.parent').toggleClass('active');
    })
});
$(function() {
  if ($(document).width() < 1440) {
    return false;
  }

  const $sidebar = $('.sidebar_sticky');
  const headerHeight = 70;
  const offsetHeight = 0;
  const $stopEl = $('.stop-sticky-sidebar');

  if ($sidebar.length) {
    const startProps = {
      top: $sidebar.offset().top,
      right: $(window).width() - $sidebar.offset().left - $sidebar.width(),
      width: $sidebar.width(),
    };

    $(window).scroll(function() {
      const scrolled = $(window).scrollTop();
      
      if (scrolled > startProps.top - headerHeight - offsetHeight) {
        $sidebar.css({
          position: 'fixed',
          zIndex: '1',
          top: 70 + offsetHeight,
          right: startProps.right,
          width: startProps.width,
          marginTop: 0,
        })

        if ($stopEl.offset().top < $sidebar.offset().top + $sidebar.height()) {
          const position = $stopEl.offset().top - scrolled - $sidebar.height();
          $sidebar.css({
            top: position,
          })
        }
      } else {
        $sidebar.removeAttr('style');
      }
    })
  }
});
$(function() {
  const $tabs = $('.tabs')

  if($tabs.length) {
    const isAutoplay = Boolean($tabs.data('tabs-autoplay'));
    const AUTO_SWITCH_TIME = 10; // seconds before switch tabs
    let time = 0;
    let timer = isAutoplay && runTimer();

    function runTimer() {
      return setInterval(function() {
        if (time === AUTO_SWITCH_TIME) {
          $('.tabs__nav-link:not(.active)').trigger('click');
          time = 0;
        } else {
          time++;
        }
      }, 1000);
    }

    $(document)
      .on('click', '.tabs__nav-link:not(.active)', function(e) {
        e.preventDefault();
    
        const $this = $(this);
        const imageSrc = $this.data('image');
    
        $this
          .addClass('active').siblings().removeClass('active')
          .closest('div.tabs').find('.tabs__content-item').removeClass('active').eq($this.index()).addClass('active');

        if (imageSrc) {
          $('.homepage-tabs-block__img').css('background-image', `url(${imageSrc})`);
        }

        time = 0; // reset timer
      })
      .on('mouseenter', '.tabs', function() {
        isAutoplay && clearTimeout(timer);
        time = 0;
      })
      .on('mouseleave', '.tabs', function() {
        timer = isAutoplay && runTimer();
      });
  }
});

$(function() {
  $(document).on('click', '.registration-hours__content-cell:first-of-type', function() {
    $(this).closest('.registration-hours__content-row').toggleClass('active')
  })
})
$(function() {
  $(document).on('input', '.textarea textarea', function(e) {
    const $this = $(this);
    const max = $this.data('max-length');
    const length = $this.val().length;

    max < length
      ? $this.val($this.val().substring(0, max))
      : $this.closest('.textarea').find('.textarea__info span').html(max - length)
  })
})
$(function() {
  $('.tooltip').tooltipster({
    maxWidth: 250,
  });
})
function runVideo(videoID) {
  const video = document.getElementById(videoID);

  video.paused ? video.play() : video.pause();
}
$(function() {
  const $wizardForm = $('#wizard-form');

  if (!$wizardForm.length) {
    return false;
  }

  const config = {
    form: '#wizard-form',
    formDone: '#wizard-done',
    section: 'section',
    prevBtn: '.js-wizard-prev',
    nextBtn: '.js-wizard-next',
    navigation: '.sidebar-nav',
  }

  const $form = $(config.form);
  const $containers = $wizardForm.find(config.section);
  const $navigation = $(config.navigation);
  let currentActiveId = '';

  const handleStepChange = (stepSelector) => {
    $containers.removeClass('active').css({ display: 'none' });
    $(stepSelector).addClass('active').css({ display: '' });

    $navigation.find('a').removeClass('completed active');
    $navigation.find(`a[href="${stepSelector}"]`).addClass('active');
    _handleCompletedNav();

    currentActiveId = stepSelector;
  }

  const _handleCompletedNav = () => {
    const $links = $navigation.find('a');

    $links.each((index, item) => {
      if ($(item).hasClass('active')) {
        return false;
      }

      $(item).addClass('completed');
    })
  }

  $(document)
    .on('click', config.nextBtn, (e) => {
      e.preventDefault();
      const selector = $(currentActiveId).next().attr('id');

      selector ? handleStepChange(`#${selector}`) : null;
    })
    .on('click', config.prevBtn, (e) => {
      e.preventDefault();
      const selector = $(currentActiveId).prev().attr('id');

      selector ? handleStepChange(`#${selector}`) : null;
    })
    .on('click', `${config.navigation} a`, function(e) {
      e.preventDefault();

      handleStepChange($(this).attr('href'));
    })
    .on('submit', config.form, function(e) {
      e.preventDefault();

      $form.css({ display: 'none' });
      $(config.formDone).css({ display: '' });

      handleStepChange();

      console.log($form.serialize()) // TODO: ajax reuest with serialized data
    })

  // firt init call
  handleStepChange(`#${$containers.first().attr('id')}`);
})