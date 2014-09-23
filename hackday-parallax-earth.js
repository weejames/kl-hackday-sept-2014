if (window.DeviceOrientationEvent) {

    $('.kandl-hero').css('background-size', '160%');
    $('.kandl-hero').css('background-position', 'center');
    $('.kandl-hero').css('transform', 'translateZ(0)');

    var degressOfMovement = 60;
    var percentageMovementWidth = 50;
    var percentageMovementHeight = 50;
    var percentagePerDegreeWidth = percentageMovementWidth / percentageMovementWidth;
    var percentagePerDegreeHeight = percentageMovementHeight / percentageMovementHeight;

    // Listen for the deviceorientation event and handle the raw data
    window.addEventListener('deviceorientation', function(eventData) {

        if(window.innerWidth > window.innerHeight) {
            var tiltLR = Math.floor(eventData.gamma);
            var tiltFB = Math.floor(eventData.beta);
        } else {
            var tiltLR = Math.floor(eventData.beta);
            var tiltFB = Math.floor(eventData.gamma);
        }

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
