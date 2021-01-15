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
        var compareNumber = compareMoment.hour();
        var actualNumber = currentMomentObj.hour();
        if (currentMomentObj.isBefore(compareMoment)) { eventEl.attr("style", "background-color: rgb(107, 238, 107);"); } else if (compareNumber === (actualNumber)) {
            eventEl.attr("style", "background-color: rgb(240, 51, 51);");
        } else if (currentMomentObj.isAfter(compareMoment)) {
            eventEl.attr("style", "background-color: rgb(165, 161, 161);");
        }



        $("#time-column").append(timeEl);
        $("#event-column").append(eventEl);

    }

};
createCalendar();