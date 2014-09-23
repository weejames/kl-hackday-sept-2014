if (window.DeviceOrientationEvent) {

    $('.kandl-hero').css('background-size', '160%');
    $('.kandl-hero').css('background-position', 'center');

    var degressOfMovement = 50;
    var percentageMovementWidth = 50;
    var percentageMovementHeight = 50;
    var percentagePerDegreeWidth = percentageMovementWidth / percentageMovementWidth;
    var percentagePerDegreeHeight = percentageMovementHeight / percentageMovementHeight;

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

        var leftPos = Math.floor(tiltLR * percentagePerDegreeWidth);
        var topPos = Math.floor(tiltFB * percentagePerDegreeHeight);

        if (topPos >= 0) {
            topPos = Math.min(percentageMovementHeight, topPos);
        } else {
            topPos = Math.max( - percentageMovementHeight, topPos);
        }

        if (leftPos >= 0) {
            leftPos = Math.min(percentageMovementWidth, leftPos);
        } else {
            leftPos = Math.max( - percentageMovementWidth, leftPos);
        }

        var position = (leftPos + 50) + '% ' + (topPos + 50) + '%';

        $('.kandl-hero').css('background-position', position );


    }, false);


} else {
    alert('Alas! No device orientation API!')
}
