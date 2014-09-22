if (window.DeviceOrientationEvent) {


    var scaledSize = 180;
    var normalSize = 152;

    var movementAreaInPixels = scaledSize - normalSize;

    var degressOfMovement = 50;

    var pixelsPerDegree = movementAreaInPixels / 35;

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

        var leftPos = Math.floor(tiltLR * pixelsPerDegree);
        var topPos = Math.floor(tiltFB * pixelsPerDegree);


        if (topPos >= 0) {
            topPos = Math.min(movementAreaInPixels, topPos);
        } else {
            topPos = Math.max( - movementAreaInPixels, topPos);
        }

        if (leftPos >= 0) {
            leftPos = Math.min(movementAreaInPixels, leftPos);
        } else {
            leftPos = Math.max( - movementAreaInPixels, leftPos);
        }

        $('.c-iwonder-guides-image-container img').css('left', - leftPos);
        $('.c-iwonder-guides-image-container img').css('top',  - topPos);


    }, false);


} else {
    alert('Alas! No device orientation API!')
}
