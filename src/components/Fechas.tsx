import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ClassNames } from "@emotion/react";

const today = dayjs();
const yesterday = dayjs().subtract(1, "day");

function Fechas() {
  return (
    <div className="container text-center">
      <h4>Especificar rango de fechas</h4>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <div className="container">
            <div className="row justify-content-evenly">
              <div className="col-5">
                <DemoItem label="Fecha inicial">
                  <DateTimePicker
                    defaultValue={today}
                    maxDate={yesterday}
                    views={["year", "month", "day", "hours", "minutes"]}
                  />
                </DemoItem>
              </div>
              <div className="col-5">
                <DemoItem label="Fecha final">
                  <DateTimePicker
                    defaultValue={today}
                    maxDate={yesterday}
                    views={["year", "month", "day", "hours", "minutes"]}
                  />
                </DemoItem>
              </div>
            </div>
          </div>
        </DemoContainer>
      </LocalizationProvider>
      &nbsp;
    </div>
  );
}

export default Fechas;
