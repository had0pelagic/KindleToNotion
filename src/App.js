import "./App.css";
import "./style.css";
import axios from "axios";
import { Paper, Box, Typography, Button, TextField } from "@mui/material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { makeStyles } from "@mui/material/styles";
import HelpIcon from "@mui/icons-material/Help";
import { useState } from "react";

function App() {
  const url = `${process.env.REACT_APP_API_URL}/clippings-notion`;
  const [uploadFile, setUploadFile] = useState();
  const [data, setData] = useState({
    dateFrom: "",
    dateTo: "",
    type: 1,
    databaseId: "",
    secret: "",
  });

  const submitForm = async (event) => {
    event.preventDefault();

    const dataArray = new FormData();
    dataArray.append("File", uploadFile[0]);
    dataArray.append("DateFrom", data.dateFrom);
    dataArray.append("DateTo", data.dateTo);
    dataArray.append("Type", data.type);
    dataArray.append("DatabaseId", data.databaseId);
    dataArray.append("Secret", data.secret);

    await axios
      .post(url, dataArray)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box className="Form-box" sx={{ backgroundColor: "#92ba92" }}>
          <Paper
            className="Form-paper-heading"
            elevation={1}
            sx={{ backgroundColor: "#78938a" }}
          >
            <Typography
              className="Typography-heading"
              sx={{ fontSize: "2rem" }}
            >
              {"Kindle To Notion"}
            </Typography>
          </Paper>

          <Paper
            className="Form-paper"
            elevation={1}
            sx={{ backgroundColor: "#f1ddbf" }}
          >
            <Box className="Form-help">
              <Button className="Form-help-button">
                <HelpIcon
                  className="Form-help-icon"
                  sx={{ color: "#525e75", fontSize: "2rem" }}
                />
              </Button>
            </Box>
            <Box className="Form-main">
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  // value={value}
                  // onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider> */}
              <TextField
                margin="normal"
                id="Text"
                label="Text"
                variant="outlined"
              />
              <TextField
                margin="normal"
                id="Text"
                label="Text"
                variant="outlined"
              />
              <Button sx={{ color: "#525e75" }}>Submit</Button>
            </Box>
          </Paper>
        </Box>
        {/* <p style={{fontSize:"45px"}}>Kindle to Notion</p>
        <form onSubmit={submitForm}>
          Date from:
          <input
            className="dateFrom"
            id="dateFrom"
            value={data.dateFrom}
            onChange={handleSearchChange}
            placeholder="2020-01-01"
          />
          <br />
          Date to:
          <input
            className="dateTo"
            id="dateTo"
            value={data.dateTo}
            onChange={handleSearchChange}
            placeholder="2022-11-11"
          />
          <br />
          Type:
          <input
            className="type"
            id="type"
            value={data.type}
            onChange={handleSearchChange}
          />
          <br />
          Database id:
          <input
            className="databaseId"
            id="databaseId"
            value={data.databaseId}
            onChange={handleSearchChange}
          />
          <br />
          Secret:
          <input
            className="secret"
            id="secret"
            value={data.secret}
            onChange={handleSearchChange}
            placeholder="secret_...."
          />
          <br />

          <input type="file" onChange={(e) => setUploadFile(e.target.files)} />
          <br />

          <input type="submit" />
        </form> */}
      </header>
    </div>
  );
}

export default App;
