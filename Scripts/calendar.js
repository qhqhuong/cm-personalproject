var events = [];
$(".Bookings").each(function () {
    var title = "Booking Group";
    var email = $(".email", this).text().trim();
    var name = $(".firstName", this).text().trim();
    var start = $(".start", this).text().trim();
    var selectedDate = new Date(start).getDay();
    var eventID = $(".ID", this).text().trim();

    var event = {
        "title": email,
        "start": start,
        "ID": eventID,
    };
    events.push(event);
});
var calendar = $('#calendar');
calendar.fullCalendar({
    locale: 'au',
    selectable: true,
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    events: events,
    eventRender: function (event, element, view) {
        element.find(".fc-title").append(" (" + event.ID + ")");
        if (view.name == 'listDay') {
            element.find(".fc-title").append("<span class='closeon'>X</span>");
        } else {
            element.find(".fc-content").prepend('<a class="closeon" href="/Bookings/Delete/' + event.ID +'" style="color: antiquewhite;">CANCEL</a>');
        }
        element.find(".closeon").on('click', function () {
            $('#calendar').fullCalendar('removeEvents', event._id);
        });
    },
    eventLimit: true,
    views: {
        timeGrid: {eventLimit:6}},
    eventColor: '#378006',
    displayEventTime: true,
    dayClick: function (date, allDay, jsEvent, view) {
        var d = new Date(date);
        var m = moment(d).format("YYYY-MM-DD");
        m = encodeURIComponent(m);
        var todayDate = moment($.now()).format("YYYY-MM-DD");
        var currentDate = d.getDay();
        if (m < todayDate) {
            alert("Sorry, you can't select the date in the past");
        }
        if (m >= todayDate) {
            if (currentDate === 1 ) {
                alert("Monday is not available for booking");
            }
            else {
                var uri = "/Bookings/Create?date=" + m;
                $(location).attr('href', uri);
            }
        }
    }
});


