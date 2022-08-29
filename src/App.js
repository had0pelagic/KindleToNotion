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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

function App() {
  const types = {
    0: "All",
    1: "Note",
    2: "Highlight",
    3: "Bookmark",
  };
  const url = `${process.env.REACT_APP_API_URL}/clippings-notion`;
  const [uploadFile, setUploadFile] = useState(null);
  const [data, setData] = useState({
    dateFrom: null,
    dateTo: null,
    type: 1,
    databaseId: "",
    secret: "",
    takeFirst: false,
    takeLast: false,
    limit: 0,
  });
  const [open, setOpen] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    const dataArray = new FormData();
    dataArray.append("File", uploadFile);
    dataArray.append("DateFrom", moment(data.dateFrom).format("YYYY-MM-DD"));
    dataArray.append("DateTo", moment(data.dateTo).format("YYYY-MM-DD"));
    dataArray.append("Type", data.type);
    dataArray.append("DatabaseId", data.databaseId);
    dataArray.append("TakeFirst", data.takeFirst);
    dataArray.append("TakeLast", data.takeLast);
    dataArray.append("Limit", data.limit);
    dataArray.append("Secret", data.secret);

    await axios
      .post(url, dataArray)
      .then((response) => {
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
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

  const handleDialog = () => {
    setOpen(!open);
  };

  const handleFileReset = () => {
    setUploadFile(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box className="Form-box" sx={{ backgroundColor: "transparent" }}>
          <Paper
            className="Form-paper-heading"
            elevation={10}
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
            elevation={10}
            sx={{ backgroundColor: "#f1ddbf" }}
          >
            <Box className="Form-help">
              <HelpIcon
                className="Form-help-icon"
                sx={{ color: "#3f51b5", fontSize: "1.4rem" }}
                onClick={() => handleDialog()}
              />
            </Box>

            <Dialog onClose={handleDialog} open={open}>
              <DialogTitle variant="h5" sx={{ backgroundColor: "#f1ddbf" }}>
                About
              </DialogTitle>
              <DialogContent dividers sx={{ backgroundColor: "#f1ddbf" }}>
                <Typography variant="h6" gutterBottom>
                  This tool is designed to send all clippings to your personal
                  Notion workspace.
                </Typography>
                <Typography variant="h6" gutterBottom>
                  To send clippings to Notion, enter your workspace Database Id,
                  workspace secret and upload MyClippings.txt file from kindle.
                </Typography>
                <Typography variant="h6" gutterBottom>
                  In settings, you can select date, type and be able to take a
                  selected amount of clippings from the start or the back of the
                  file.
                </Typography>
              </DialogContent>
            </Dialog>

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
                  width: "45%",
                }}
              >
                Upload MyClippings.txt
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                  onClick={(e) => (e.target.value = null)}
                  hidden
                />
              </Button>

              {uploadFile ? (
                <div className="Form-upload">
                  <Typography>{uploadFile.name}</Typography>
                  <Button onClick={() => handleFileReset()}>X</Button>
                </div>
              ) : (
                <></>
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
                  <Typography
                    variant="h5"
                    sx={{ fontSize: "1.3rem", color: "black" }}
                  >
                    Settings
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="Form-settings-accordion-details">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        className="Form-settings-input"
                        margin="normal"
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
                    <TextField
                      className="Form-settings-input"
                      margin="normal"
                      select
                      value={data.type}
                      label="Type"
                      id="type"
                      onChange={handleTypeSelectChange}
                    >
                      {Object.keys(types).map((key) => (
                        <MenuItem key={key} value={key}>
                          {types[key]}
                        </MenuItem>
                      ))}
                    </TextField>

                    {!data.takeLast ? (
                      <div className="Form-checkbox">
                        <Typography>Take first</Typography>
                        <Checkbox
                          onChange={() => handleCheckboxChange("takeFirst")}
                        />
                      </div>
                    ) : (
                      <></>
                    )}

                    {!data.takeFirst ? (
                      <div className="Form-checkbox">
                        <Typography>Take last</Typography>
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
                  margin: "0px 0px 20px 0px",
                  width: "35%",
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
