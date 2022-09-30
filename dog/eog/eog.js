var NUM_PARTICLES = ( ( ROWS = 96 ) * ( COLS = 100 ) ),
THICKNESS = Math.pow( 80, 2 ),
SPACING = 2,
MARGIN = 0,
COLOR = 255,
DRAG = 1,
EASE = 0.25,

/*

used for sine approximation, but Math.sin in Chrome is still fast enough :)http://jsperf.com/math-sin-vs-sine-approximation

B = 4 / Math.PI,
C = -4 / Math.pow( Math.PI, 2 ),
P = 0.225,

*/

container,
particle,
canvas,
mouse,
list,
ctx,
tog,
dx, dy,
mx, my,
d, t, f,
a, b,
i, n,
w, h,
p, s,
r, c
;

particle = {
    vx: 0,
    vy: 0,
    x: 0,
    y: 0
};

var dog = [
    [
        [2, 1],
        [3, 1],
        [3, 2],
        [4, 2],
        [4, 1],
        [8, 1],
        [8, 2],
        [9, 2],
        [9, 1],
        [10, 1],
        [10, 3],
        [11, 3],
        [11, 5],
        [13, 5],
        [13, 6],
        [15, 6],
        [15, 7],
        [18, 7],
        [18, 4],
        [19, 4],
        [19, 13],
        [18, 13],
        [18, 17],
        [17, 17],
        [17, 18],
        [16, 18],
        [16, 15],
        [14, 15],
        [14, 17],
        [13, 17],
        [13, 18],
        [12, 18],
        [12, 15],
        [8, 15],
        [8, 17],
        [7, 17],
        [7, 18],
        [6, 18],
        [6, 15],
        [4, 15],
        [4, 17],
        [3, 17],
        [3, 18],
        [2, 18],
        [2, 14],
        [1, 14],
        [1, 4],
        [2, 4],
        [2, 1]
    ]
];
var dog_left_eye = [
    [
        [3, 4],
        [4, 4],
        [4, 5],
        [3, 5],
        [3, 4]
    ]
];
var dog_right_eye = [
    [
        [6, 4],
        [7, 4],
        [7, 5],
        [6, 5],
        [6, 4]
    ]
];
var dog_mouth = [
    [
        [4, 6], 
        [6, 6], 
        [6, 7], 
        [5, 7], 
        [5, 8], 
        [7, 8], 
        [7, 7], 
        [8, 7], 
        [8, 8], 
        [7, 8], 
        [7, 9], 
        [3, 9], 
        [3, 8], 
        [2, 8], 
        [2, 7], 
        [3, 7], 
        [3, 8], 
        [4, 8], 
        [4, 6]
    ]
];

var noPixels = false;

function init() {
    container = document.getElementById( 'container' );
    canvas = document.createElement( 'canvas' );

    ctx = canvas.getContext( '2d' );
    tog = true;

    list = [];

    w = canvas.width = COLS * SPACING + MARGIN * 2;
    h = canvas.height = ROWS * SPACING + MARGIN * 2;

    container.style.marginLeft = Math.round( w * -0.5 ) + 'px';
    container.style.marginTop = Math.round( h * -0.5 ) + 'px';

    for ( i = 0; i < NUM_PARTICLES; i++ ) {
        p = Object.create( particle );
        p.x = p.ox = MARGIN + SPACING * ( i % COLS );
        p.y = p.oy = MARGIN + SPACING * Math.floor( i / COLS );

        list[i] = p;
    }

    container.addEventListener( 'mousemove', function(e) {
        if (!noPixels) {
            bounds = container.getBoundingClientRect();
            mx = e.clientX - bounds.left;
            my = e.clientY - bounds.top;
        }
    });

    container.appendChild( canvas );
}

function step() {
    if ( tog = !tog ) {
        
        for ( i = 0; i < list.length; i++ ) {
            p = list[i];
            
            d = ( dx = mx - p.x ) * dx + ( dy = my - p.y ) * dy;
            f = -THICKNESS / d;

            if ( d < THICKNESS ) {
                t = Math.atan2( dy, dx );
                p.vx += f * Math.cos(t);
                p.vy += f * Math.sin(t);
            }

            p.x += ( p.vx *= DRAG ) + (p.ox - p.x) * EASE;
            p.y += ( p.vy *= DRAG ) + (p.oy - p.y) * EASE;
        }

    } else {

        b = ( a = ctx.createImageData( w, h ) ).data;

        for ( i = 0; i < list.length; i++ ) {
            p = list[i];
            b[n = ( ~~p.x + ( ~~p.y * w ) ) * (noPixels ? 5 : 4)] = b[n+1] = b[n+2] = COLOR, b[n+3] = 255;
        }

        ctx.putImageData( a, 0, 0 );
    }

    if (!noPixels && !list.length) {
        noPixels = true;
        document.querySelector('canvas').remove();
        mx = undefined;
        my = undefined;
        setTimeout(function() {
            init();
            setTimeout(function() {
                mx = 30;
                my = 25;
                setTimeout(function() {
                    window.location = 'fog'
                }, 400);
            }, 1000);
        }, 1000);
    }

    list.forEach(function(p, i) {
        if (
            pointInPolygon([ p.x / (5 * SPACING), p.y / (5 * SPACING) ], dog) === false
            ||
            pointInPolygon([ p.x / (5 * SPACING), p.y / (5 * SPACING) ], dog_left_eye) !== false
            ||
            pointInPolygon([ p.x / (5 * SPACING), p.y / (5 * SPACING) ], dog_right_eye) !== false
            ||
            pointInPolygon([ p.x / (5 * SPACING), p.y / (5 * SPACING) ], dog_mouth) !== false
            ) list.splice(i, 1);
    });

    requestAnimationFrame( step );
}

init();
step();