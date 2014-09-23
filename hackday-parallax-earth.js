if (window.DeviceOrientationEvent) {

    $('.kandl-hero').css('background-size', '180%');
    $('.kandl-hero').css('background-position', 'center');

    var scaledSizeWidth = 500;
    var normalSizeWidth = 320;
    var scaledSizeHeight = 400;
    var normalSizeHeight = 320;

    var movementAreaInPixelsWidth = scaledSizeWidth - normalSizeWidth;
    var movementAreaInPixelsHeight = scaledSizeHeight - normalSizeHeight;

    var degressOfMovement = 50;

    var pixelsPerDegreeWidth = movementAreaInPixelsWidth / 35;
    var pixelsPerDegreeHeight = movementAreaInPixelsHeight / 35;

    // Listen for the deviceorientation event and handle the raw data
    window.addEventListener('deviceorientation', function(eventData) {

        // gamma is the left-to-right tilt in degrees, where right is positive
        var tiltLR = Math.floor(eventData.gamma);
        //tiltLR = Math.floor(tiltLR / 4) * 4;

        // beta is the front-to-back tilt in degrees, where front is positive
        var tiltFB = Math.floor(eventData.beta);
        //tiltFB = Math.floor(tiltFB / 4) * 4;

        //console.log(tiltLR, tiltFB);

        if (tiltLR >= 0) {
            tiltLR = Math.min(degressOfMovement, tiltLR);
        } else {
            tiltLR = Math.max( - degressOfMovement, tiltLR);
        }

        if (tiltFB >= 0) {
            tiltFB = Math.min(degressOfMovement, tiltFB);
        } else {
            tiltFB = Math.max( - degressOfMovement, tiltFB);
        }

        //console.log(tiltLR);

        var leftPos = Math.floor(tiltLR * pixelsPerDegreeWidth);
        var topPos = Math.floor(tiltFB * pixelsPerDegreeHeight);


        if (topPos >= 0) {
            topPos = Math.min(movementAreaInPixelsHeight, topPos);
        } else {
            topPos = Math.max( - movementAreaInPixelsHeight, topPos);
        }

        if (leftPos >= 0) {
            leftPos = Math.min(movementAreaInPixelsWidth, leftPos);
        } else {
            leftPos = Math.max( - movementAreaInPixelsWidth, leftPos);
        }

        var position = leftPos + 'px ' + topPos + 'px';

        //$('.kandl-hero').css('background-position', position );


    }, false);


} else {
    alert('Alas! No device orientation API!')
}