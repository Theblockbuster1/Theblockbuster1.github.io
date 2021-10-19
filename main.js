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
        }
    });
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