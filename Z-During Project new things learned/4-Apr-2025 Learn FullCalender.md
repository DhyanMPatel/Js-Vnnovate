# FullCalender react

- This is the package for Calender that display month, week and day wise.
- There are

  1. dayGridPlugin (for month, week, day view)
  2. timeGridPlugin (for time duration in day and week view)
  3. interactionPlugin (for intarect with events)
  4. listPlugin (for list view)

  ```
  <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
    initialView="dayGridMonth"
    headerToolbar={{
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    }}
    rerenderDelay={10}
    editable={true}
    views={{
      listWeek: { buttonText: "List" },
    }}
    eventDurationEditable={true}
    selectable={true}
    selectMirror={true}
    droppable={true}
    ref={this.calendarComponentRef}
    events={this.state.calendarEvents}
    eventDrop={this.drop}
    eventReceive={this.eventReceive}
    eventClick={this.eventClick}
  />
  ```
