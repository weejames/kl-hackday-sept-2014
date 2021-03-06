if (window.DeviceOrientationEvent) {

    var getVars = getUrlVars();

    var startScale = getVars['scale'] || 160

    var degressOfMovement = parseInt(getVars['deg']) || 15;
    var percentageMovementWidth = 50;
    var percentageMovementHeight = 50;
    var percentagePerDegreeWidth = percentageMovementWidth / degressOfMovement;
    var percentagePerDegreeHeight = percentageMovementHeight / degressOfMovement;

    var startAngle = false; // taking a guess at the rough start angle

    $('.kandl-hero').css('background-size', startScale + '%');
    $('.kandl-hero').css('background-position', 'center');
    $('.kandl-hero').css('transform', 'translateZ(0)');


    // Listen for the deviceorientation event and handle the raw data
    window.addEventListener('deviceorientation', function(eventData) {
        var tiltLR = Math.floor(eventData.gamma);
        var tiltFB = Math.floor(eventData.beta);

        if (startAngle === false) {
            startAngle = tiltFB;
        }

        tiltFB = tiltFB - startAngle;

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

// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
