var events = [];
var textEventEl;

var currentMomentObj = moment();
var currentMomentString = currentMomentObj.format("dddd, MMMM Do YYYY, h:mm:ss a");

var createCalendar = function(thisMoment) {

    var timeArray = [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5];

    $("#currentDay").append(currentMomentString);
    var amPm = "am";

    for (var i = 0; i < timeArray.length; i++) {
        var timeIndex = timeArray[i] + ':00' + amPm;
        var listTime = moment(timeIndex, 'h:mma').format('ha');

        var timeEl = $("<div>")
            .addClass("time-hour-block p-5")
            .attr("id", "time-hour-block")
            .text(listTime);
        if (timeArray[i] === 11) { amPm = "pm"; };
        var eventEl = $("<div>")
            .addClass("event-element")
            .html("<textarea id='" + listTime + "' class='event-form' ></textarea>");


        var compareMoment = moment(timeIndex, 'ha');
        var compareNumber = compareMoment.hour();
        var actualNumber = currentMomentObj.hour();
        if (currentMomentObj.isBefore(compareMoment)) {
            eventEl.attr("style", "background-color: rgb(107, 238, 107);");

        } else if (compareNumber === (actualNumber)) {
            eventEl.attr("style", "background-color: rgb(240, 51, 51);");
        } else if (currentMomentObj.isAfter(compareMoment)) {
            eventEl.attr("style", "background-color: rgb(165, 161, 161);");
        }
        var saveButton = $("<button>")
            .addClass("saveBtn btn-lg oi oi-circle-check p-5")
            .attr("id", listTime);



        $("#time-column").append(timeEl);
        $("#event-column").append(eventEl);
        $("#save-column").append(saveButton);


    }

};
var addMyEvent = function(texty, timey) {
    $("#" + timey).html(texty);
}
$(document).ready(function() {

    $("button").on("click", function() {
        var myButton = $(this);
        var timeId = $(this).attr('id');
        var myText = $.trim($("#" + timeId).val());
        if (myButton.length > 0) {
            console.log(timeId + " : " + myText);
            events.push({
                text: myText,
                time: timeId
            });
            saveEvents();
            addMyEvent(myText, timeId);
        }
    });

});

var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
};
var loadTasks = function() {
    events = JSON.parse(localStorage.getItem("events"));
    for (var i = 0; i < events.length; i++) {
        addMyEvent(events[i].text, events[i].time);
        console.log(events[i]);
    }

};
createCalendar();
loadTasks();