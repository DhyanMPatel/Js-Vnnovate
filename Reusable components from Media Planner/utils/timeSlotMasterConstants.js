import * as Yup from "yup";

// Dummy Data
export const dummyTimeSlots = [
  {
    id: 1,
    mediaType: "Television",
    name: "Morning",
    start_time: "06:00 AM",
    end_time: "12:00 PM",
  },
  {
    id: 2,
    mediaType: "Television",
    name: "Afternoon",
    start_time: "12:00 PM",
    end_time: "05:00 PM",
  },
  {
    id: 3,
    mediaType: "Television",
    name: "Prime Time",
    start_time: "06:00 PM",
    end_time: "11:59 PM",
  },
  {
    id: 4,
    mediaType: "Radio",
    name: "Morning Drive",
    start_time: "07:00 AM",
    end_time: "10:00 AM",
  },
  {
    id: 5,
    mediaType: "Radio",
    name: "Evening Drive",
    start_time: "04:00 PM",
    end_time: "07:00 PM",
  },
];

// Initial Values
export const initialTimeSlotValues = {
  mediaType: "Digital Display",
  name: "Morning",
  start_time: "00:00 AM",
  end_time: "00:00 PM",
};

// Validation Schema
export const timeSlotValidationSchema = Yup.object().shape({
  mediaType: Yup.string()
    .required("Media Type is required"),
  name: Yup.string()
    .required("Time slot name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  start_time: Yup.string()
    .required("Start time is required")
    .test("is-valid-time", "Invalid start time format (HH:MM AM/PM)", (value) => {
      return /^([01]\d|2[0-3]):([0-5]\d) [AP]M$/.test(value);
    }),
  end_time: Yup.string()
    .required("End time is required")
    .test("is-valid-time", "Invalid end time format (HH:MM AM/PM)", (value) => {
      return /^([01]\d):([0-5]\d) [AP]M$/.test(value);
    })
    .test(
      "is-after-start",
      "End time must be after start time",
      function (endTime) {
        const { start_time } = this.parent;
        if (!start_time || !endTime) return true;
        return (
          new Date(`2000-01-01 ${endTime}`) >
          new Date(`2000-01-01 ${start_time}`)
        );
      }
    ),
});
