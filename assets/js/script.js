var events = {};


var currentMomentObj = moment("3:30pm", 'h:mma');
var currentMomentString = currentMomentObj.format("dddd, MMMM Do YYYY, h:mm:ss a");

var createCalendar = function(thisMoment) {

    var timeArray = [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5];

    $("#currentDay").append(currentMomentString);
    var amPm = "am";

    for (var i = 0; i < timeArray.length; i++) {
        var timeIndex = timeArray[i] + ':00' + amPm;
        var listTime = moment(timeIndex, 'h:mma').format('ha');

        var timeEl = $("<div>")
            .addClass("time-element p-5")
            .text(listTime);
        if (timeArray[i] === 11) { amPm = "pm"; };
        var eventEl = $("<div>")
            .addClass("event-element p-5")
            .attr("id", "event-time-block")
            .text("Event Info");

        var compareMoment = moment(timeIndex, 'ha');
        if (currentMomentObj.isAfter(compareMoment)) {
            eventEl.attr("style", "background-color: grey;");
        } else if (compareMoment.isSame(currentMomentObj)) {
            eventEl.attr("style", "background-color: red;");
        } else { eventEl.attr("style", "background-color: green;"); }

        $("#time-column").append(timeEl);
        $("#event-column").append(eventEl);

    }

};
createCalendar();