let circled = false;
$(function() {
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
  var path = e.composedPath ? e.composedPath() : e.path;
  for(var i = 0; path[i] !== document.body; i++) {
    if (path[i].classList.contains('draggable-window')) {
        let w = $(e.target).closest('.draggable-window');

        highestZIndex += 1;
        w[0].style['z-index'] = highestZIndex;

        if (typeof(w.attr('data-stack-number')) !== 'undefined' && w.attr('data-stack-number') !== '') {
            stackNumber = w.attr('data-stack-number') - 1;
            w.attr('data-stack-number', '');
        }
    }
    if (path[i].classList.contains('dragger')) {
      clickedDragger = true;
    }
    else if (path[i].classList.contains('title-bar-button')) {
      clickedButton = true;
    }
    else if (clickedDragger && !clickedButton && path[i].classList.contains('draggable-window')) {
      target = path[i];
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