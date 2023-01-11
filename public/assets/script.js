let start = 0;
let click = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const calendar = document.getElementById('calendar');
const newEventForm = document.getElementById('newEventForm');
const deleteEventForm = document.getElementById('deleteEventForm');
const backDrop = document.getElementById('FormBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function renderCalendar() { //function for creating calendar
    const date = new Date();
    if (start !== 0) {
        date.setMonth(new Date().getMonth() + start);
    }
    const month = date.getMonth(); //set month, day and year
    const day = date.getDate();
    const year = date.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1); //saves first day of the month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); //saves the last date of the month
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', { 
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    document.getElementById('monthDisplay').innerText =
        `${date.toLocaleDateString('en-us', { month: 'long' })} ${year}`;
    calendar.innerHTML = '';
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
        const dayString = `${month + 1}/${i - paddingDays}/${year}`;
        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find(e => e.date === dayString);
            if (i - paddingDays === day && start === 0) {
                daySquare.id = 'currentDay';
            }
            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }
            daySquare.addEventListener('click', () => openForm(dayString));
        } else {
            daySquare.classList.add('padding');
        }
        calendar.appendChild(daySquare);
    }
}
function openForm(date) { //opens bubble on calendar date click
    click = date;
    const eventForDay = events.find(e => e.date === click);
    if (eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventForm.style.display = 'block';
    } else {
        newEventForm.style.display = 'block';
    }
    backDrop.style.display = 'block';
}
function closeForm() { //close bubble
    eventTitleInput.classList.remove('error');
    newEventForm.style.display = 'none';
    deleteEventForm.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    click = null;
    renderCalendar();
}
function saveEvent() { //saves the reservation to the calendar
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');
        events.push({
            date: click,
            title: eventTitleInput.value,
        });
        localStorage.setItem('events', JSON.stringify(events));
        closeForm();
    } else {
        eventTitleInput.classList.add('error');
    }
}
function deleteEvent() { //removes the reservation from the calendar
    events = events.filter(e => e.date !== click);
    localStorage.setItem('events', JSON.stringify(events));
    closeForm();
}
function buttons() { //all button functionality here, next/prev month, save, cancel, delete, close and new.
    document.getElementById('nextMonth').addEventListener('click', () => {
        start++;
        renderCalendar();
    });
    document.getElementById('previousMonth').addEventListener('click', () => {
        start--;
        renderCalendar();
    });
    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeForm);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeForm);
    document.getElementById('newButton').addEventListener('click', saveEvent);
}
buttons();
renderCalendar();