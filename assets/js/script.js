// Initializing the array which holds the event objects
var events = [];
// Create a moment object for the current date and time
var currentMomentObj = moment();
var currentMomentString = currentMomentObj.format("dddd, MMMM Do YYYY, h:mm:ss a");
// Formatting the object into a string we can display

// This mothod builds the calendar and accounts for the changing time
var createCalendar = function(thisMoment) {
    // timeArray stores the times that will be built into time-blocks.  
    // Since this is an array it would easily be adjusted to cover any time range needed

    var timeArray = [5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5];
    //  Add current date/time to the header
    $("#currentDay").append(currentMomentString);
    var amPm = "am";
    //  Using a variable to set up the time-block rows
    for (var i = 0; i < timeArray.length; i++) {
        // translating each array value into moment objects so the time is comparable
        // I wanted the value to be available for multiple uses
        var timeIndex = timeArray[i] + ':00' + amPm;
        var listTime = moment(timeIndex, 'h:mma').format('ha');
        // This builds the contents of the event and time blocks of the calendar, with an editable textarea

        var timeEl = $("<div>")
            .addClass("time-hour-block p-5")
            .attr("id", "time-hour-block")
            .text(listTime);
        if (timeArray[i] === 11) { amPm = "pm"; };
        var eventEl = $("<div>")
            .addClass("event-element")
            .html("<textarea id='" + listTime + "' class='event-form' ></textarea>");
        // Instead of relying on the CSS to change the background for different times, I decided to use
        // Jquery and JavaScript to accomplish this using the colors the client wanted

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
        // A button for the user to click and it will save the contents of the textarea
        var saveButton = $("<button>")
            .addClass("saveBtn btn-lg far fa-save p-5")
            // using Awesome Font save icon
            .attr("id", listTime);
        // I used the time slot as the unique id

        // Add the elements created dynamically to the HTML

        $("#time-column").append(timeEl);
        $("#event-column").append(eventEl);
        $("#save-column").append(saveButton);

    }

};
// This function takes in the text and time slot to create an event object
// The event object is then pushed to the events array and added to the correct area within the HTML
var addMyEvent = function(myTextEl, myTimeEl) {
    console.log(myTimeEl + " : " + myTextEl);
    var eventObj = {
        time: myTimeEl,
        text: myTextEl
    };
    events.push(eventObj);
    $("#" + myTimeEl).html(myTextEl);
    saveEvents();
    // Finally the updated array is stored in localStorage for persistence
}

// Event listener for the save button element
$(document).ready(function() {
    $("button").on("click", function() {
        var myButton = $(this);
        var timeId = myButton.attr('id');
        var myText = $.trim($("#" + timeId).val());
        if (myText.length > 0) {
            // Make sure there is something worth saving!
            var isDuplicate = false;
            // Check to see if there is a duplicate event entry
            // if events is null it is not a duplicate and we can add the event to the time slot
            if (!events) {
                addMyEvent(myText, timeId);
            } else {
                for (var i = 0; i < events.length && !isDuplicate; i++) {
                    if ((timeId === events[i].time) &&
                        (myText === events[i].text)) {
                        isDuplicate = true;
                    }
                }
                // Check array to make sure it's not a duplicate
                if (!isDuplicate) {
                    addMyEvent(myText, timeId);
                } else { return false; }
                // If it is a duplicate we won't add the object and to indicate this we return falsey
            }

        }
    });

});
// Stores the object array events in localStorage using JSON stringify
var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
};
// Loads the object array stored in localStorage and transfers them to the events array
var loadEvents = function() {

    var loadedEvents = JSON.parse(localStorage.getItem("events"));
    if (loadedEvents) {
        for (var i = 0; i < loadedEvents.length; i++) {
            addMyEvent(loadedEvents[i].text, loadedEvents[i].time);
            console.log(loadedEvents[i]);
        }
        events = loadedEvents;
    } else { return false; }
    // If there are no tasks to load then we return falsey

};
// Call function to build the calendar
createCalendar();
// Call function to load events stored in localStorage
loadEvents();
// Refreshes the page every 30 mins to keep the clock and events accurate
setInterval(function() {
    window.location.reload();
}, 30 * 60000);