let circled = false;
$(function() {
	$('#pagepiling').pagepiling({
        onLeave: function(_, index) {
            if (index == 2) {
                $('.block-reveal').addClass('shown');
                $('.block-reveal-over').addClass('shown');
            }
            if (index == 4) {
                $('img.dogg').attr('src', 'assets/images/d.gif');
            }
            if (index == $('#pagepiling div.section').length && !circled) {
                circled = true;
                start_circle();
                new TypeIt('#center-text')
                .pause(1000)
                .exec(function() {
                    $('#center-text').removeClass('hidden');
                })
                .pause(1000)
                .type('Theblockbuster1')
                .exec(function() {
                    $('#center-image').addClass('show');
                    showLinks();
                    window.lineColors = { h: 52, s: 100, l: 58, a: 1 };
                })
                .pause(200)
                .exec(function() {
                    delete window.lineColors;
                })
                .pause(1000)
                .exec(function() {
                    window.lineColors = { h: 52, s: 100, l: 58, a: 1 };
                })
                .pause(500)
                .exec(function() {
                    delete window.lineColors;
                })
                .pause(200)
                .exec(function() {
                    window.lineColors = { h: 52, s: 100, l: 58, a: 1 };
                })
                .pause(200)
                .exec(function() {
                    delete window.lineColors;
                })
                .go();
            }
        }
    });


    $('#gallery > *').slice(1).hide();
    let index = 0;
    let maxIndex = $('#gallery > *').length - 1;
    $('.arrows.fa-chevron-right').on('click', function() {
        if (index === maxIndex) return;
        $('.arrows.fa-chevron-left').removeClass('disabled');
        index++;
        let elements = $('#gallery > *').get();
        $(elements.splice(index, 1)).show();
        $(elements).hide();
        if (index === maxIndex) $(this).addClass('disabled');
    });
    $('.arrows.fa-chevron-left').on('click', function() {
        if (index === 0) return;
        $('.arrows.fa-chevron-right').removeClass('disabled');
        index--;
        let elements = $('#gallery > *').get();
        $(elements.splice(index, 1)).show();
        $(elements).hide();
        if (index === 0) $(this).addClass('disabled');
    });

    var dogshakeint;
    var dogClickCount = 0;
    $('div#dog-spin').on('click', function() {
        ++dogClickCount
        clearTimeout(dogshakeint);
        if (dogClickCount == 3) $('div#dog-spin').removeClass('shake-0').addClass('shake-1px');
        if (dogClickCount == 9) $('div#dog-spin').removeClass('shake-1px').addClass('shake-1_1px');
        if (dogClickCount == 13) $('div#dog-spin').removeClass('shake-1_1px').addClass('shake-1_2px');
        if (dogClickCount == 14) $('div#dog-spin').removeClass('shake-1_2px').addClass('shake-1_3px');
        if (dogClickCount == 16) $('div#dog-spin').removeClass('shake-1_3px').addClass('shake-1_4px');
        if (dogClickCount == 17) $('div#dog-spin').removeClass('shake-1_4px').addClass('shake-1_5px');
        if (dogClickCount == 18) $('div#dog-spin').removeClass('shake-1_5px').addClass('shake-1_6px');
        if (dogClickCount == 19) $('div#dog-spin').removeClass('shake-1_6px').addClass('shake-1_7px');
        if (dogClickCount == 20) $('div#dog-spin').removeClass('shake-1_7px').addClass('shake-1_8px');
        if (dogClickCount == 21) $('div#dog-spin').removeClass('shake-1_8px').addClass('shake-1_9px');
        if (dogClickCount == 22) $('div#dog-spin').removeClass('shake-1_9px').addClass('shake-2px');
        if (dogClickCount == 25) $('div#dog-spin').removeClass('shake-2px').addClass('shake-2_5px');
        if (dogClickCount == 29) $('div#dog-spin').removeClass('shake-2_5px').addClass('shake-3px');
        if (dogClickCount == 31) {
            $('div#dog-spin').removeClass('shake-3px').addClass('dog-shocked');
            setTimeout(function() { window.location = '/dog' }, 100);
        } else {
            $('div#dog-spin').addClass('shake-little');
            dogshakeint = setTimeout(function() { $('div#dog-spin').removeClass('shake-little'); }, 500);
        }
    });
});

$(window).on('resize', function() {
    $('canvas').remove();
    App.setup();
});

async function showLinks() {
    $('.links a .link-btn').each(function(i) {
        let b = $(this);
        let bp = b.parent();
        setTimeout(function() {
            bp.attr('href', bp.attr('data-href'));
            b.addClass('show');
        }, 1000 * i);
    });
}

function windowSize(that, size) {
    let w = $(that).closest('.draggable-window')[0]; w.style.transform = `scale(${Number(w.style.transform.slice(6,-1) || 1) + size})`;
}

function popupWindow(text, title='Info', options) {
    let defaults = { center: false, height: false };
    options = {...defaults, ...options};
    highestZIndex += 1;
    let prevStack = $(`[data-stack-number="${stackNumber}"]`);
    stackNumber += 1;
    return `<div class="draggable-window" style="z-index: ${highestZIndex};${prevStack.length ? ` left: ${Number(prevStack.css('left').slice(0, -2)) + 20}px; top: ${Number(prevStack.css('top').slice(0, -2)) + 20}px;` : ''}" data-stack-number="${stackNumber}">
    <div class="draggable"${options.height ? ` style="height:${options.height}"` : ''}>
        <div class="title-bar dragger">
            <div class="title-bar-text">${title}</div>
            <div class="title-bar-controls">
                <button class="title-bar-button" aria-label="Minimize" onclick="windowSize(this, -0.01)"></button>
                <button class="title-bar-button" aria-label="Maximize" onclick="windowSize(this, 0.01)"></button>
                <button class="title-bar-button" aria-label="Close" onclick="$(this).closest('.draggable-window').remove();"></button>
            </div>
        </div>
        <div class="window-body">
            <p${options.center ? ` style="display:flex;justify-content:center;align-items:center;"` : ''} >${text}</p>
        </div>
    </div>
</div>`;
}

var x, y, target = null;
var highestZIndex = 10000;
var stackNumber = 0;
document.addEventListener('mousedown', function(e) {
  var clickedDragger = false;
  var clickedButton = false;
  for(var i = 0; e.path[i] !== document.body; i++) {
    if (e.path[i].classList.contains('draggable-window')) {
        let w = $(e.target).closest('.draggable-window');

        highestZIndex += 1;
        w[0].style['z-index'] = highestZIndex;

        if (typeof(w.attr('data-stack-number')) !== 'undefined' && w.attr('data-stack-number') !== '') {
            stackNumber = w.attr('data-stack-number') - 1;
            w.attr('data-stack-number', '');
        }
    }
    if (e.path[i].classList.contains('dragger')) {
      clickedDragger = true;
    }
    else if (e.path[i].classList.contains('title-bar-button')) {
      clickedButton = true;
    }
    else if (clickedDragger && !clickedButton && e.path[i].classList.contains('draggable-window')) {
      target = e.path[i];
      target.classList.add('dragging');
      x = e.clientX - $(target).position().left;
      y = e.clientY - $(target).position().top;
      return;
    }
  }
});
document.addEventListener('mouseup', function() {
  if (target !== null) target.classList.remove('dragging');
  target = null;
});
document.addEventListener('mousemove', function(e) {
  if (target === null) return;
  target.style.left = e.clientX - x + 'px';
  target.style.top = e.clientY - y + 'px';
});

jQuery.fn.visible = function() {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};

function toggleTreeView(button) {
    $('#about-me-button').toggle();
    let treeView = $('ul.tree-view');
    treeView.removeClass('blink');
    let treeViewChildren = treeView.children();
    treeViewChildren.slice(2).toggle();
    treeViewChildren.eq(1).visibilityToggle();
    if (treeView[0].style.height == '12px') treeView.css('height', '');
    else treeView.css('height', '12px');

    if ($(button).attr('aria-label') == 'Maximize') $(button).attr('aria-label', 'Restore');
    else $(button).attr('aria-label', 'Maximize');
}

var audio = new Audio('/assets/audio/Legal_Woes.ogg');
audio.loop = true;
var playingMusic = false;
function toggleMusic() {
    if (playingMusic) {
        audio.pause();
        $('#play-music img').attr('src', 'assets/images/icons/play.png');
        playingMusic = false;
    } else {
        audio.play();
        $('#play-music img').attr('src', 'assets/images/icons/pause.png');
        playingMusic = true;
    }
};