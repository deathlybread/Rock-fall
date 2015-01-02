// Generated by CoffeeScript 1.8.0

/*
	Copyright (c) Prithvi Kohli 2014
	All rights reserved
	prithvikohli.co.uk
	Contact: prithvi@prithvikohli.co.uk
 */

(function() {
  var HEIGHT, WIDTH, arrow, c, ctx, game, logo_fall, logo_rock, requestAnimationFrame, wall_left, wall_right;

  c = $('#game')[0];

  ctx = c.getContext('2d');

  WIDTH = window.innerWidth;

  HEIGHT = window.innerHeight;

  requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  logo_rock = new Image();

  logo_fall = new Image();

  arrow = new Image();

  wall_left = new Image();

  wall_right = new Image();

  game = {
    main_hasStarted: false,
    preload: function() {
      logo_rock.src = 'assets/images/Logo-rock.png';
      logo_rock.onload = function() {
        return console.log('LOGO_ROCK LOADED');
      };
      logo_fall.src = 'assets/images/Logo-fall.png';
      logo_fall.onload = function() {
        return console.log('LOGO_FALL LOADED');
      };
      wall_left.src = 'assets/images/Wall-left.png';
      wall_left.onload = function() {
        return console.log('WALL_LEFT LOADED');
      };
      wall_right.src = 'assets/images/Wall-right.png';
      wall_right.onload = function() {
        return console.log('WALL_RIGHT LOADED');
      };
      game.init();
    },
    init: function() {
      c.width = 500;
      c.height = 500;
      if (HEIGHT > WIDTH) {
        alert('Game best played in landscape orientation!');
      }
      game.render();
    },
    render: function() {
      ctx.clearRect(0, 0, 500, 500);
      ctx.fillStyle = '#D44639';
      ctx.fillRect(0, 0, 500, 500);
      if (game.main_hasStarted === false) {
        game.menu.renderMenu();
      }
      requestAnimationFrame(game.render);
    },
    menu: {
      intro: {
        fall_hasFinished: false,
        shake_hasFinished: false,
        options_hasFinished: false,
        rock_posY: -100,
        fall_posY: -100,
        rock_posX: 146,
        fall_posX: 146,
        shake_direction: 'down',
        shake_fact: 10,
        options_speed: 10
      },
      renderMenu: function() {
        ctx.drawImage(wall_left, 0, 0);
        ctx.drawImage(wall_right, 447, 0);
        ctx.drawImage(logo_rock, game.menu.intro.rock_posX, game.menu.intro.rock_posY);
        ctx.drawImage(logo_fall, game.menu.intro.fall_posX, game.menu.intro.fall_posY);
        ctx.fillStyle = '#f36c60';
        ctx.font = '50px Pixel';
        ctx.fillText('Play', 191, 305);
        ctx.fillStyle = '#ffab91';
        ctx.font = '50px Pixel';
        ctx.fillText('Play', 191, 300);
        ctx.fillStyle = '#f36c60';
        ctx.font = '50px Pixel';
        ctx.fillText('Options', 155, 375);
        ctx.fillStyle = '#ffab91';
        ctx.font = '50px Pixel';
        ctx.fillText('Options', 155, 370);
        game.menu.handleAnimations();
      },
      handleAnimations: function() {
        if (game.menu.intro.fall_hasFinished === false && game.menu.intro.shake_hasFinished === false && game.menu.intro.options_hasFinished === false) {
          if (game.menu.intro.rock_posY < 100) {
            game.menu.intro.rock_posY++;
          } else {
            if (game.menu.intro.fall_posY < 171) {
              game.menu.intro.fall_posY += 4.5;
              game.audio.playOnce('logo-fall');
            } else {
              game.audio.playOnce('logo-hit');
              game.menu.intro.fall_hasFinished = true;
            }
          }
        } else if (game.menu.intro.fall_hasFinished === true && game.menu.intro.shake_hasFinished === false && game.menu.intro.options_hasFinished === false) {
          if (game.menu.intro.shake_direction === 'up') {
            if (game.menu.intro.rock_posY > 80) {
              game.menu.intro.rock_posY -= game.menu.intro.shake_fact;
              game.menu.intro.fall_posY -= game.menu.intro.shake_fact;
              if (game.menu.intro.shake_fact > 0) {
                game.menu.intro.shake_fact -= 0.2;
              } else {
                game.menu.intro.shake_fact = 0;
                game.menu.intro.shake_hasFinished = true;
              }
            } else {
              game.menu.intro.shake_direction = 'down';
            }
          } else if (game.menu.intro.shake_direction === 'down') {
            if (game.menu.intro.fall_posY < 191) {
              game.menu.intro.fall_posY += game.menu.intro.shake_fact;
              game.menu.intro.rock_posY += game.menu.intro.shake_fact;
              if (game.menu.intro.shake_fact > 0) {
                game.menu.intro.shake_fact -= 0.2;
              } else {
                game.menu.intro.shake_fact = 0;
                game.menu.intro.shake_hasFinished = true;
              }
            } else {
              game.menu.intro.shake_direction = 'up';
            }
          }
        }
      }
    },
    audio: {
      old: null,
      playOnce: function(sound) {
        if (sound !== game.audio.old) {
          $('#' + sound)[0].play();
          game.audio.old = sound;
        }
      }
    }
  };

  $(game.preload());

}).call(this);
