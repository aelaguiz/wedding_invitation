function animatePoof(pos, callback) {
	var bgTop = 0; // initial background-position for the poof sprit is '0 0'
	var frames = 5; // number of frames in the sprite animation
	var frameSize = 32; // size of poof <div> in pixels (32 x 32 px in this example)
	var frameRate = 100; // set length of time each frame in the animation will display (in milliseconds)

	var $poof = $('.poof');
	$poof.css('left', pos[0] + "px");
	$poof.css('top', pos[1] + "px");
	$poof.show();

	//var chain = $('.poof');
	//// loop through amination frames
	//// and display each frame by resetting the background-position of the poof <div>
	//for(i=1;i<frames;i++) {
		//console.log("Going to " + bgTop - frameSize);
		//chain = chain.animate({
			//backgroundPosition: '0 ' + (bgTop - frameSize) + 'px'
		//}, frameRate, function() {
			//console.log("Done");
		//});

		//bgTop -= frameSize; // update bgPosition to reflect the new background-position of our poof <div>
	//}
	//// wait until the animation completes and then hide the poof <div>
	setTimeout(function() {
		$('.poof').hide();
		callback.call();
	}, frames * frameRate);
}

