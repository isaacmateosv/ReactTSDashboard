import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const today = dayjs();
const yesterday = dayjs().subtract(1, "day");

function Fechas() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <div className="container">
          <div className="row">
            <div className="col">
              <DemoItem label="Fecha inicial">
                <DateTimePicker
                  defaultValue={today}
                  maxDate={yesterday}
                  views={["year", "month", "day", "hours", "minutes"]}
                />
              </DemoItem>
            </div>
            <div className="col">
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
  );
}

export default Fechas;
