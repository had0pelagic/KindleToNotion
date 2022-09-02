import "./style.css";
import { useState } from "react";
import moment from "moment";
import api from "../../api";
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
  Backdrop,
  CircularProgress,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ClippingTypes } from "../../util/type_enum";

export default function Form() {
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
  const [openDialog, setOpenDialog] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    const errors = getFormErrors();
    if (errors.length > 0) {
      alert(errors);
      return;
    }

    setOpenBackdrop(true);
    const response = await api.post("/clippings-notion", formData());

    if (response.status === 200) {
      setOpenBackdrop(false);
      alert(response.data);
    } else {
      setOpenBackdrop(false);
      console.log(response.data.errors);
    }
  };

  const formData = () => {
    const dataArray = new FormData();

    dataArray.append("File", uploadFile);
    dataArray.append(
      "DateFrom",
      data.dateFrom ? moment(data.dateFrom).format("YYYY-MM-DD") : ""
    );
    dataArray.append(
      "DateTo",
      data.dateTo ? moment(data.dateTo).format("YYYY-MM-DD") : ""
    );
    dataArray.append("Type", data.type);
    dataArray.append("DatabaseId", data.databaseId);
    dataArray.append("TakeFirst", data.takeFirst);
    dataArray.append("TakeLast", data.takeLast);
    dataArray.append("Limit", data.limit);
    dataArray.append("Secret", data.secret);

    return dataArray;
  };

  const getFormErrors = () => {
    var errors = [];

    if (!data.limit.toString().match("^[0-9]+$")) {
      errors.push("Limit must be a number\n");
    }
    if (uploadFile && /(?:.([^.]+))?$/.exec(uploadFile.name)[1] !== "txt") {
      errors.push("Please upload file with .txt extension\n");
    }
    if (!uploadFile) {
      errors.push("Please upload Clippings file\n");
    }
    if (!data.databaseId) {
      errors.push("Please enter database id\n");
    }
    if (!data.secret) {
      errors.push("Please enter secret\n");
    }

    return errors.join("");
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

  const handleDateReset = (id) => {
    setData((prevState) => ({
      ...prevState,
      [id]: null,
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
    setOpenDialog(!openDialog);
  };

  const handleFileReset = () => {
    setUploadFile(null);
  };

  return (
    <Box className="Form-box" sx={{ backgroundColor: "transparent" }}>
      <LoadingBackdrop openBackdrop={openBackdrop} />
      <FormHeading />
      <FormContent
        handleDialog={handleDialog}
        openDialog={openDialog}
        data={data}
        handleSearchChange={handleSearchChange}
        handleFileChange={handleFileChange}
        uploadFile={uploadFile}
        handleFileReset={handleFileReset}
        handleDateChange={handleDateChange}
        handleDateReset={handleDateReset}
        handleTypeSelectChange={handleTypeSelectChange}
        handleCheckboxChange={handleCheckboxChange}
        submitForm={submitForm}
      />
    </Box>
  );
}

function LoadingBackdrop({ openBackdrop }) {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

function FormHeading() {
  return (
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
  );
}

function FormContent({
  handleDialog,
  openDialog,
  data,
  handleSearchChange,
  handleFileChange,
  uploadFile,
  handleFileReset,
  handleDateChange,
  handleDateReset,
  handleTypeSelectChange,
  handleCheckboxChange,
  submitForm,
}) {
  return (
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

      <HelpDialog handleDialog={handleDialog} openDialog={openDialog} />

      <Box className="Form-main">
        <MainInputs
          data={data}
          handleSearchChange={handleSearchChange}
          handleFileChange={handleFileChange}
          uploadFile={uploadFile}
          handleFileReset={handleFileReset}
        />

        <SettingsAccordion
          data={data}
          handleDateChange={handleDateChange}
          handleDateReset={handleDateReset}
          handleTypeSelectChange={handleTypeSelectChange}
          handleCheckboxChange={handleCheckboxChange}
          handleSearchChange={handleSearchChange}
        />

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
  );
}

function HelpDialog({ handleDialog, openDialog }) {
  return (
    <Dialog onClose={handleDialog} open={openDialog}>
      <DialogTitle variant="h5" sx={{ backgroundColor: "#f1ddbf" }}>
        About
      </DialogTitle>
      <DialogContent dividers sx={{ backgroundColor: "#f1ddbf" }}>
        <Typography variant="h6" gutterBottom>
          This tool is designed to send all clippings to your personal Notion
          workspace.
        </Typography>
        <Typography variant="h6" gutterBottom>
          To send clippings to Notion, enter your workspace Database Id,
          workspace secret and upload MyClippings.txt file from kindle.
        </Typography>
        <Typography variant="h6" gutterBottom>
          In settings, you can select date and type. Select "Take first" or
          "Take last" to limit clippings to be taken from the start or the back
          of the file.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

function MainInputs({
  data,
  handleSearchChange,
  handleFileChange,
  uploadFile,
  handleFileReset,
}) {
  return (
    <>
      <TextField
        className="Form-input"
        id="databaseId"
        type="text"
        label="Database ID"
        value={data.databaseId}
        onChange={handleSearchChange}
        variant="outlined"
      />
      <TextField
        className="Form-input"
        margin="normal"
        id="secret"
        type="text"
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
          margin: "10px 0px 10px 0px",
          width: "45%",
        }}
      >
        Upload MyClippings.txt
        <input
          type="file"
          accept="text/plain"
          onChange={(e) => handleFileChange(e)}
          onClick={(e) => (e.target.value = null)}
          hidden
        />
      </Button>

      {uploadFile ? (
        <div className="Form-upload">
          <Typography>{uploadFile.name}</Typography>
          <Button
            sx={{
              minWidth: "1px",
              maxWidth: "1px",
              minHeight: "1px",
              maxHeight: "1px",
              marginLeft: "4px",
            }}
            onClick={() => handleFileReset()}
          >
            X
          </Button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

function SettingsAccordion({
  data,
  handleDateChange,
  handleDateReset,
  handleTypeSelectChange,
  handleCheckboxChange,
  handleSearchChange,
}) {
  return (
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
        <Typography variant="h5" sx={{ fontSize: "1.3rem", color: "black" }}>
          Settings
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="Form-settings-accordion-details">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="Form-date">
              <DatePicker
                className={`Form-settings-date${
                  data.dateFrom === null ? "" : "-button"
                }`}
                margin="normal"
                label="Date from"
                inputVariant="outlined"
                value={data.dateFrom}
                onChange={(e) => handleDateChange("dateFrom", e)}
                animateYearScrolling
              />
              {data.dateFrom ? (
                <Button
                  sx={{
                    minWidth: "1px",
                    maxWidth: "1px",
                    minHeight: "1px",
                    maxHeight: "1px",
                    marginLeft: "4px",
                  }}
                  onClick={() => handleDateReset("dateFrom")}
                >
                  X
                </Button>
              ) : (
                <></>
              )}
            </div>
            <div className="Form-date">
              <DatePicker
                className={`Form-settings-date${
                  data.dateTo === null ? "" : "-button"
                }`}
                margin="normal"
                label="Date to"
                inputVariant="outlined"
                value={data.dateTo}
                onChange={(e) => handleDateChange("dateTo", e)}
                animateYearScrolling
              />
              {data.dateTo ? (
                <Button
                  onClick={() => handleDateReset("dateTo")}
                  sx={{
                    minWidth: "1px",
                    maxWidth: "1px",
                    minHeight: "1px",
                    maxHeight: "1px",
                    marginLeft: "4px",
                  }}
                >
                  X
                </Button>
              ) : (
                <></>
              )}
            </div>
          </MuiPickersUtilsProvider>
          <TextField
            className="Form-settings-type"
            margin="normal"
            select
            value={data.type}
            label="Type"
            id="type"
            onChange={handleTypeSelectChange}
          >
            {Object.keys(ClippingTypes).map((key) => (
              <MenuItem key={key} value={key}>
                {ClippingTypes[key]}
              </MenuItem>
            ))}
          </TextField>

          {!data.takeLast ? (
            <div className="Form-checkbox">
              <Typography>Take first</Typography>
              <Checkbox onChange={() => handleCheckboxChange("takeFirst")} />
            </div>
          ) : (
            <></>
          )}

          {!data.takeFirst ? (
            <div className="Form-checkbox">
              <Typography>Take last</Typography>
              <Checkbox onChange={() => handleCheckboxChange("takeLast")} />
            </div>
          ) : (
            <></>
          )}

          {data.takeFirst || data.takeLast ? (
            <div className="Fade-in">
              <TextField
                className="Form-settings-input"
                type="text"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "/^-?d+(?:.d+)?$/g",
                }}
                margin="normal"
                id="limit"
                label="Limit"
                value={data.limit}
                onChange={handleSearchChange}
                variant="outlined"
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
