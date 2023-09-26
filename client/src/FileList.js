import React, { useState, useEffect, Fragment } from "react";
import axios from "axios"; // Import Axios or another HTTP client library

import { Link } from "react-router-dom";

function FileList() {
  const [files, setFiles] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:5000/api/files")
  //       .then((response) => {
  //         setFiles(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, []);
  const onLogin = () => {
    axios
      .get("http://localhost:5000/api/files")
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="text-left">
      <button className="btn-css" onClick={onLogin}>
        Login
      </button>
      {files ? (
        <>
          {files.map((file) => (
            <div key={file._id} className="ml-5 h5">
              <Link to={`/${file.fileName}`} style={{ color: "#3D1C0B" }}>
                {file.fileName}
              </Link>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default FileList;
