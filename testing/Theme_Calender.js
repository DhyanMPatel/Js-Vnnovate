import React, { Component, createRef } from "react";
import { Col, Row, Card } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import Alert from "sweetalert2";

class EventCalendar extends Component {
  state = {
    calendarEvents: JSON.parse(localStorage.getItem("Events")) || [],
    events: [
      { title: "Event 1", id: "1" },
      { title: "Event 2", id: "2" },
      { title: "Event 3", id: "3" },
      { title: "Event 4", id: "4" },
      { title: "Event 5", id: "5" },
    ],
    showTable: false,
  };

  /**
   * adding dragable properties to external events through javascript
   */
  componentDidMount() {
    let draggableEl = document.getElementById("external-events");
    // console.log(`Calender Events: `, this.state.calendarEvents);

    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id,
        };
      },
    });
  }
  handleEvents = (events) => {
    const newEvents = events
      // .filter(
      //   (event) => !this.state.calendarEvents.some((e) => e.id === event.id)
      // )
      .map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
      }));
    // console.log(`New Events: `, newEvents);
    // console.log(`Calender Events: `, this.state.calendarEvents);

    // if (newEvents.length > 0) {
    //   this.setState((prevState) => ({
    //     calendarEvents: [...prevState.calendarEvents, ...newEvents],
    //   }));
    // }

    localStorage.setItem("Events", JSON.stringify(newEvents));
  };

  calendarComponentRef = createRef(); // Step 1

  getCalendarData = () => {
    this.setState({ showTable: !this.state.showTable });

    console.log(`Get Data: `, this.state.calendarEvents);

    // this.state.calendarEvents.map((event) => console.log(`Events: `, event));
  };

  eventReceive = (info) => {
    const newEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      allDay: info.event.allDay,
    };

    const alreadyExists = this.state.calendarEvents.some(
      (event) => event.id === newEvent.id && event.start === newEvent.start
    );

    console.log(`event receive: `, newEvent);

    if (!alreadyExists) {
      const updatedEvents = [...this.state.calendarEvents, newEvent];

      this.setState({ calendarEvents: updatedEvents });
      localStorage.setItem("Events", JSON.stringify(updatedEvents));
    } else {
      info.event.remove(); // Avoid visual duplicate
    }
  };

  drop = (info) => {
    // const updatedEvents = info.event;
    // console.log(`Drop: `, updatedEvents.id);
    // console.log(`Drop: `, updatedEvents.title);
    // console.log(`Drop: `, updatedEvents.start);
    // console.log(
    //   `Drop: `,
    //   updatedEvents.end == null
    //     ? new Date(new Date(updatedEvents.start).getTime() + 3600000)
    //     : updatedEvents.end
    // );
    // console.log(`Drop: `, updatedEvents.allDay);

    const updatedEvents = this.state.calendarEvents.map((event) =>
      event.id === info.event.id
        ? {
            ...event,
            start: info.event.allDay ? null : info.event.start, // or toLocaleString()
            end:
              info.event.end == null && !info.event.allDay
                ? new Date(new Date(info.event.start).getTime() + 3600000)
                : info.event.end,
            allDay: info.event.allDay,
          }
        : event
    );

    console.log("Drop :", updatedEvents);

    this.setState({ calendarEvents: updatedEvents });
    localStorage.setItem("Events", JSON.stringify(updatedEvents));
  };

  resize = (info) => {
    // const updatedEvents = info.event;
    // console.log(`Resize: `, updatedEvents.id);
    // console.log(`Resize: `, updatedEvents.title);
    // console.log(`Resize: `, updatedEvents.start);
    // console.log(`Resize: `, updatedEvents.end);
    // console.log(`Resize: `, updatedEvents.allDay);

    const updatedEvents = this.state.calendarEvents.map((event) =>
      event.id === info.event.id
        ? {
            ...event,
            start: info.event.start,
            end: info.event.end,
          }
        : event
    );

    console.log("Resized:", updatedEvents);

    this.setState({ calendarEvents: updatedEvents });
    localStorage.setItem("Events", JSON.stringify(updatedEvents));
  };

  /**
   * when we click on event we are displaying event details
   */
  eventClick = (eventClick) => {
    Alert.fire({
      title: eventClick.event.title,
      html:
        `<div className="table-responsive">
      <table className="table">
      <tbody>
      <tr >
      <td>Title</td>
      <td><strong>` +
        eventClick.event.title +
        `</strong></td>
      </tr>
      <tr >
      <td>Start Time</td>
      <td><strong>
      ` +
        eventClick.event.start +
        `
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Remove Event",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.value) {
        eventClick.event.remove(); // It will remove event from the calendar

        const updatedEvents = this.state.calendarEvents.filter(
          (event) => event.id !== eventClick.event.id
        );

        this.setState({
          calendarEvents: updatedEvents,
        });
        localStorage.setItem("Events", JSON.stringify(updatedEvents));
        Alert.fire("Deleted!", "Your Event has been deleted.", "success");
      }
    });
  };

  render() {
    return (
      <div className="animated fadeIn demo-app">
        <Row>
          <Col lg={3}>
            <Card>
              <div className="card-header border-0 pb-0">
                <h4 className="text-black fs-20 mb-0">Events</h4>
                <div>
                  <button
                    class="font-bold py-2 px-4 rounded"
                    onClick={this.getCalendarData}
                  >
                    {this.state.showTable ? "Calender" : "Table"}
                  </button>
                </div>
              </div>
              <Card.Body>
                <div id="external-events">
                  {this.state.events.map((event) => (
                    <>
                      <div
                        className="fc-event mt-0 ms-0 mb-2 btn btn-block btn-primary"
                        title={event.title}
                        data={event.id}
                        key={event.id}
                      >
                        {event.title}
                      </div>
                    </>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            <Card>
              <Card.Body>
                <div className="demo-app-calendar" id="mycalendartest">
                  {this.state.showTable ? (
                    <>
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Event Title</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Whole Day</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.calendarEvents.map((event) => (
                            <tr key={event.id + event.start}>
                              <td>{event.id}</td>
                              <td>{event.title}</td>
                              <td>{new Date(event.start).toLocaleString()}</td>
                              <td>
                                {event.end && !event.allDay
                                  ? new Date(event.end).toLocaleString()
                                  : new Date(event.start).toLocaleString()}
                              </td>

                              <td>{event.allDay ? "Yes" : "No"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <FullCalendar
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        listPlugin,
                        interactionPlugin,
                      ]}
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
                      eventResize={this.resize}
                      eventReceive={this.eventReceive}
                      eventClick={this.eventClick}
                      eventsSet={this.handleEvents}
                    />
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EventCalendar;
