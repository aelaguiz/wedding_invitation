var Entity = function($el, startPos, anim) {
	this.$el = $el;
	this.startPos = startPos;
	this.anim = anim;
	this.animIndex = 0;
	this.height = this.$el.height();
	this.width = this.$el.width();

	this.setPosition(startPos);

	_.bindAll(this);
};

Entity.prototype = {
	setPosition: function(pos) {
		var left = pos[0] - this.width/2;
		var top = pos[1] - this.height/2;

		this.$el.css('left', left + "px");
		this.$el.css('top', top + "px");
	},

	start: function(callback) {
		this.animDoneCallback = callback;
		this.$el.show();
		this.advanceAnim();
	},

	advanceAnim: function() {
		var anim = this.anim[this.animIndex];
		this.$el.animate(anim, anim.duration, this.onAnimDone);
	},

	onAnimDone: function() {
		this.animIndex++;

		if(this.animIndex < this.anim.length) {
			this.advanceAnim();
		}
		else {
			if(this.animDoneCallback) {
				this.animDoneCallback();
			}
		}
	},

	hide: function() {
		this.$el.hide();
	}
};

var poof = function(pacman, mrspacman) {
	animatePoof([385, 285], onPoofDone);
	pacman.hide();
	mrspacman.hide();
};

var onPoofDone = function() {
	var formal_pacman = new Entity($('#formal_pacman'), [375, 300],
				[
					{
						duration: 2000,
						top:'-=275'
					}
				]);
	var formal_mrspacman = new Entity($('#formal_mrspacman'), [425, 305],
				[
					{
						duration: 2000,
						top:'-=275'
					}
				]);
	formal_pacman.start(function() {
		formal_pacman.$el.removeClass('rotated');
	});
	formal_mrspacman.start(function() {
		formal_mrspacman.$el.removeClass('rotated');

		$('.text').fadeIn();

		$('.text').click(function() {
			var $rsvp = $('.rsvp');
			$rsvp.fadeIn();
		});
	});
};

var main = function() {
	$('.rsvplink').click(function() {
		var $rsvp = $('.rsvp');
		$rsvp.fadeIn();
	});

	var pacman = new Entity($('#pacman'), [100, 300],
				[
					{
						duration: 2000,
						left:'+=285'
					}
				]);
	var mrspacman = new Entity($('#mrspacman'), [700, 300],
				[
					{
						duration: 2000,
						left:'-=285'
					}
				]);

	var $dots = $('.sprite.dot');
	var dots = [];

	var dotX = 150;
	for(var i = 0; i < $dots.length; i++) {
		var $dot = $($dots[i]);

		var dot = new Entity($dot, [dotX, 300]);
		dots.push(dot);

		dotX += 50;
	}

	var pmLatch = 0;
	pacman.start(function() {
		pmLatch++;

		if(pmLatch === 2) {
			poof(pacman, mrspacman);
		}
	});
	mrspacman.start(function() {
		pmLatch++;

		if(pmLatch === 2) {
			poof(pacman, mrspacman);
		}
	});

	var dotDelta = 0;
	var dotTime = 200;

	var dotCb = function() {
		var dot1 = dots[dotDelta];
		if(!dot1) return;
		var dot2 = dots[dots.length - dotDelta-1];

		dot1.hide();
		dot2.hide();

		setTimeout(dotCb, dotTime);
		dotDelta++;
	};

	setTimeout(dotCb, dotTime);
};

main();
