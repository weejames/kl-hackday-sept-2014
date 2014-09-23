if (window.DeviceOrientationEvent) {

    $('.kandl-hero').css('background-size', '200%');
    $('.kandl-hero').css('background-position', 'center');
    $('.kandl-hero').css('transform', 'translateZ(0)');

    var degressOfMovement = 30;
    var percentageMovementWidth = 50;
    var percentageMovementHeight = 50;
    var percentagePerDegreeWidth = percentageMovementWidth / degressOfMovement;
    var percentagePerDegreeHeight = percentageMovementHeight / degressOfMovement;

    var startAngle = false; // taking a guess at the rough start angle

    // Listen for the deviceorientation event and handle the raw data
    window.addEventListener('deviceorientation', function(eventData) {
        var tiltLR = Math.floor(eventData.gamma);
        var tiltFB = Math.floor(eventData.beta);
        
        if (startAngle === false) tiltFB = tiltFB + startAngle;

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
