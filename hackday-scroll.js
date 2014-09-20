if (window.DeviceOrientationEvent) {

    var goingUP = false;
    var goingDOWN = false;
    var scrollEvery = 1;
    var startScrollIncrement = 5;
    var scrollIncrement = 5;
    var events = 0;
    var scrollPosition = document.body.scrollTop;

    var startAngle = 45;

    var tiltBackStart = 35;
    var tiltForwardStart = 60;
    var tiltDifferential = 15;

    var maxIncrement = 10

    var inertia = 5;


    // Listen for the deviceorientation event and handle the raw data
    window.addEventListener('deviceorientation', function(eventData) {
        events ++;

        // gamma is the left-to-right tilt in degrees, where right is positive
        var tiltLR = eventData.gamma;

        // beta is the front-to-back tilt in degrees, where front is positive
        var tiltFB = eventData.beta;

        // alpha is the compass direction the device is facing in degrees
        var dir = eventData.alpha

        if (events === 1) {
            startAngle = tiltFB;
            tiltBackStart = startAngle - tiltDifferential;
            tiltForwardStart = startAngle + tiltDifferential;
        }

        if (events % scrollEvery != 0) {
            return;
        }

        if (tiltFB < 1) return;

        if (events % inertia != 0) {
            scrollIncrement ++;
        }

        if (tiltFB > tiltForwardStart) {
            goingUp = true;
            if (scrollPosition - scrollIncrement >= 0) {
                scrollPosition -= scrollIncrement;
                window.scrollTo(0, scrollPosition);
            }

        } else if (tiltFB < tiltBackStart && !goingUP) {
            goingDown = true;
            if (scrollPosition + scrollIncrement <= document.height) {
                scrollPosition += scrollIncrement;
                window.scrollTo(0, scrollPosition);
            }


        } else {
            goingUP = false;
            goingDOWN = false;
            scrollIncrement = startScrollIncrement;
        }

    }, false);


} else {
    alert('Alas! No device orientation API!')
}
