var events = [];
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
var addMyEvent = function(myTextEl, myTimeEl) {
    console.log(myTimeEl + " : " + myTextEl);
    var eventObj = {
        time: myTimeEl,
        text: myTextEl
    };
    events.push(eventObj);
    $("#" + myTimeEl).html(myTextEl);
    saveEvents();
}
$(document).ready(function() {

    $("button").on("click", function() {
        var myButton = $(this);
        var timeId = myButton.attr('id');
        var myText = $.trim($("#" + timeId).val());
        if (myText.length > 0) {
            var isDuplicate = false;
            if (!events) {
                addMyEvent(myText, timeId);
            } else {
                for (var i = 0; i < events.length && !isDuplicate; i++) {
                    if ((timeId === events[i].time) &&
                        (myText === events[i].text)) {
                        isDuplicate = true;
                    }
                }
                if (!isDuplicate) {
                    addMyEvent(myText, timeId);
                } else { return false; }
            }

        }
    });

});

var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
};
var loadTasks = function() {

    var loadedEvents = JSON.parse(localStorage.getItem("events"));
    if (loadedEvents) {
        for (var i = 0; i < loadedEvents.length; i++) {
            addMyEvent(loadedEvents[i].text, loadedEvents[i].time);
            console.log(loadedEvents[i]);
        }
        events = loadedEvents;
    } else { return false; }

};
createCalendar();
loadTasks();
setInterval(function() {
    window.location.reload();
}, 300000);