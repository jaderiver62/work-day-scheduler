var events = {};


var currentMomentObj = moment();
var currentMomentString = currentMomentObj.format("dddd, MMMM Do YYYY, h:mm:ss a");

var createCalendar = function(thisMoment) {

    var timeArray = [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5];

    $("#currentDay").append(currentMomentString);
    var amPm = "am";
    for (var i = 0; i < timeArray.length; i++) {
        var timeEl = $("<div>")
            .addClass("time-element p-5")
            .text(timeArray[i] + amPm);
        if (timeArray[i] === 11) { amPm = "pm"; };
        var eventEl = $("<div>")
            .addClass("event-element p-5")
            .text("Event Info");
        var saveIconEl = $("<div>")
            .addClass("save-icon-element p-5")
            .text("save icon");
        $("#time-column").append(timeEl);
        $("#event-column").append(eventEl);
        $("#save-delete-icon").append(saveIconEl);

    }

};
createCalendar();