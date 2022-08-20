import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  const url = "https://localhost:7113/clippings-notion";
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
        <p style={{fontSize:"45px"}}>Kindle to Notion</p>

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
        </form>
      </header>
    </div>
  );
}

export default App;
