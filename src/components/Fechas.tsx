import dayjs from "dayjs";
import { useState } from "react"; // Step 1
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const today = dayjs();
const yesterday = dayjs().subtract(1, "day");

function Fechas() {
  const [startDate, setStartDate] = useState(today); // Step 2
  const [endDate, setEndDate] = useState(today); // Step 2

  const handleStartDateChange = (date) => {
    setStartDate(date); // Step 3
  };

  const handleEndDateChange = (date) => {
    setEndDate(date); // Step 3
  };

  const formatForComputations = (date) => {
    return date.format("DD/MM/YYYY HH:mm"); // Step 4
  };

  return (
    <div className="container text-center">
      <h4>Especificar rango de fechas</h4>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <div className="container">
            <div className="row justify-content-evenly">
              <div className="col-4">
                <DemoItem label="Fecha inicial">
                  <DateTimePicker
                    value={startDate} // Use value instead of defaultValue
                    maxDate={yesterday}
                    views={["year", "month", "day", "hours", "minutes"]}
                    onChange={handleStartDateChange} // Step 3
                    format="DD/MM/YYYY HH:mm A"
                  />
                </DemoItem>
              </div>
              <div className="col-4">
                <DemoItem label="Fecha final">
                  <DateTimePicker
                    value={endDate} // Use value instead of defaultValue
                    maxDate={yesterday}
                    views={["year", "month", "day", "hours", "minutes"]}
                    onChange={handleEndDateChange} // Step 3
                    format="DD/MM/YYYY HH:mm A"
                  />
                </DemoItem>
              </div>
            </div>
          </div>
        </DemoContainer>
      </LocalizationProvider>
      <p>
        Desde: {formatForComputations(startDate)}
        <br></br>
        Hasta: {formatForComputations(endDate)}
      </p>
      &nbsp;
    </div>
  );
}

export default Fechas;
