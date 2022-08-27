import "./App.css";
import "./style.css";
import { useState } from "react";
import axios from "axios";
import {
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  MenuItem,
  Select,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

function App() {
  const types = {
    0: "NOTE",
    1: "HIGHLIGHT",
    2: "BOOKMARK",
    3: "ALL",
  };
  const url = `${process.env.REACT_APP_API_URL}/clippings-notion`;
  const [uploadFile, setUploadFile] = useState();
  const [data, setData] = useState({
    dateFrom: new Date(),
    dateTo: new Date(),
    type: 1,
    databaseId: "",
    secret: "",
    takeFirst: false,
    takeLast: false,
    limit: 0,
  });

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(data);
    console.log(uploadFile)
    // const dataArray = new FormData();
    // dataArray.append("File", uploadFile[0]);
    // dataArray.append("DateFrom", data.dateFrom);
    // dataArray.append("DateTo", data.dateTo);
    // dataArray.append("Type", data.type);
    // dataArray.append("DatabaseId", data.databaseId);
    // dataArray.append("Secret", data.secret);

    // await axios
    //   .post(url, dataArray)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDateChange = (id, value) => {
    setData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (id) => {
    setData((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleTypeSelectChange = (id) => {
    setData((prevState) => ({
      ...prevState,
      ["type"]: id.target.value,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box className="Form-box" sx={{ backgroundColor: "transparent" }}>
          <Paper
            className="Form-paper-heading"
            elevation={1}
            sx={{ backgroundColor: "#3f51b5" }}
          >
            <Typography
              className="Typography-heading"
              sx={{ fontSize: "2rem", color: "white" }}
            >
              Kindle To Notion
            </Typography>
          </Paper>

          <Paper
            className="Form-paper"
            elevation={1}
            sx={{ backgroundColor: "#f1ddbf" }}
          >
            <Box className="Form-help">
              <HelpIcon
                className="Form-help-icon"
                sx={{ color: "#525e75", fontSize: "1.4rem" }}
                onClick={() => console.log("click")}
              />
            </Box>
            <Box className="Form-main">
              <TextField
                className="Form-input"
                id="databaseId"
                label="Database ID"
                value={data.databaseId}
                onChange={handleSearchChange}
                variant="outlined"
              />
              <TextField
                className="Form-input"
                margin="normal"
                id="secret"
                label="Secret"
                value={data.secret}
                onChange={handleSearchChange}
                variant="outlined"
              />
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "#3f51b5",
                  margin: "10px 0px 0px 0px",
                }}
              >
                Upload MyClippings.txt
                <input
                  type="file"
                  onChange={(e) => setUploadFile(e.target.files)}
                  hidden
                />
              </Button>

              {uploadFile ? (
                <div>
                  <Typography>{uploadFile[0].name}</Typography>
                </div>
              ) : (
                <div></div>
              )}

              <Accordion
                className="Form-settings-accordion"
                sx={{ width: "95%", backgroundColor: "#f1ddbf" }}
                elevation={0}
              >
                <AccordionSummary
                  expandIcon={<ArrowDropDownRoundedIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h5" sx={{ fontSize: "1.3rem" }}>
                    Settings
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="Form-settings-accordion-details">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        className="Form-settings-input"
                        label="Date from"
                        inputVariant="outlined"
                        value={data.dateFrom}
                        onChange={(e) => handleDateChange("dateFrom", e)}
                        animateYearScrolling
                      />
                      <DatePicker
                        className="Form-settings-input"
                        margin="normal"
                        label="Date to"
                        inputVariant="outlined"
                        value={data.dateTo}
                        onChange={(e) => handleDateChange("dateTo", e)}
                        animateYearScrolling
                      />
                    </MuiPickersUtilsProvider>
                    <Select
                      labelId="demo-simple-select-label"
                      id="type"
                      value={data.type}
                      label="Type"
                      onChange={handleTypeSelectChange}
                    >
                      {Object.keys(types).map((key) => (
                        <MenuItem key={key} value={key}>
                          {types[key]}
                        </MenuItem>
                      ))}
                    </Select>

                    {!data.takeLast ? (
                      <div className="Form-checkbox">
                        <Typography>Take first?</Typography>
                        <Checkbox
                          onChange={() => handleCheckboxChange("takeFirst")}
                        />
                      </div>
                    ) : (
                      <></>
                    )}

                    {!data.takeFirst ? (
                      <div className="Form-checkbox">
                        <Typography>Take last?</Typography>
                        <Checkbox
                          onChange={() => handleCheckboxChange("takeLast")}
                        />
                      </div>
                    ) : (
                      <></>
                    )}

                    {data.takeFirst || data.takeLast ? (
                      <TextField
                        className="Form-settings-input"
                        margin="normal"
                        id="limit"
                        label="Limit"
                        value={data.limit}
                        onChange={handleSearchChange}
                        variant="outlined"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#3f51b5",
                  margin: "0px 0px 15px 0px",
                }}
                onClick={(e) => submitForm(e)}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Box>
      </header>
    </div>
  );
}

export default App;
