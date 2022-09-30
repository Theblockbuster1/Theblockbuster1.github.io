var x = 0; var y = 0

function bigConfetti() {
    function fire(particleRatio, opts) {
        confetti(Object.assign({}, {
            origin: { y: 0.7 }
        }, opts, {
            particleCount: Math.floor(200 * particleRatio)
        }));
    }
    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}

function createDropable(element, originalImage, draggingImage) {
    interact(element)
      .draggable({
        modifiers: [
          interact.modifiers.snap({
            targets: [
              interact.snappers.grid({ x: 6, y: 6 })
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ]
          }),
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ],
        inertia: false
      })
      .styleCursor(false)
      .on('dragmove', function (event) {
        x += event.dx
        y += event.dy
    
        event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

        if (draggingImage) event.target.setAttribute('src', draggingImage)
      })
      .on('dragend', function (event) {
        x = 0
        y = 0
        event.target.style.transform = 'translate(0px, 0px)'

        if (originalImage) event.target.setAttribute('src', originalImage)
      })
}

function createDropTarget(element, accept, overlap, ondrop) {
    interact(element).dropzone({
        
        accept,

        overlap,

        ondrop,
    })
}

var hbd = new Audio('LiterallyNoOne - sans wishes u a happy birthday.ogg');
hbd.loop = true;
var noise = new Audio('snd_noise.wav');
var bark = new Audio('snd_pombark.wav');

createDropable('#lamp-shade', 'lamp_shade.png', 'lamp_shade2.png');
createDropTarget('#dog', '#lamp-shade', '0.4', function(event) {
    interact('#dog').unset();
    event.relatedTarget.remove();
    noise.play();
    let dog = document.getElementById('dog');
    dog.setAttribute('src', 'walk_hat.gif');

    createDropable('#bulb', 'bulb.png', 'bulb_off.png');

    createDropTarget('#dog', '#bulb', '1', function(event) {
        event.relatedTarget.remove();
        dog.setAttribute('src', 'walk_hat_flashing.gif');
        bark.play();

        setTimeout(function() {
            hbd.play();
            setTimeout(function() {
                document.getElementById('shelves').setAttribute('src', 'shelves_on.gif');
                let banner = document.getElementById('banner');
                setTimeout(function() {
                    banner.classList.remove('hidden');
                    setTimeout(function() {
                        dog.classList.add('dog-centred');
                        noise.play();
                    }, 3500);
                    let bannerY = 0;
                    let bannerMove = function() {
                        banner.style.transform = `translateY(${++bannerY*6}px)`;
                        if (bannerY != 46) setTimeout(bannerMove, 600);
                        else {
                            setTimeout(function() {
                                confetti({ particleCount: 4 });
                                setTimeout(function() {
                                    dog.setAttribute('src', 'walk_hat_flashing_shocked.gif');
                                    setTimeout(function() {
                                        bigConfetti();
                                        setTimeout(function() {
                                            bigConfetti();
                                            bigConfetti();
                                            setTimeout(function() {
                                                bigConfetti();
                                                bigConfetti();
                                                setTimeout(function() {
                                                    bigConfetti();
                                                    bigConfetti();
                                                }, 250);
                                            }, 250);
                                        }, 250);
                                        setTimeout(function() {
                                            dog.setAttribute('src', 'walk_hat_flashing.gif');
                                            let loopConfetti = function() {
                                                setTimeout(function() {
                                                    bigConfetti();
                                                    loopConfetti();
                                                }, 2200);
                                            }
                                            loopConfetti();
                                        }, 1000);
                                    }, 5000);
                                }, 3000);
                            }, 1000);
                        }
                    }
                    bannerMove();
                }, 2500);
            }, 1700);
        }, 500);
    });
});