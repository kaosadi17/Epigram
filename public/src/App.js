import React, { useEffect, useState } from "react";
import "./App.css";
import EpigramModal from "./components/Modal/Modal";

import logo from "./fixtures/logo-01.svg";

function App() {
  const [epigrams, setEpigram] = useState([{}]);
  const [reload, setReload] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch("/epigrams")
      .then((response) => response.json())
      .then((data) => {
        setEpigram(data);
      });
  }, []);

  const getRandomEpigram = () => {
    const randomElement = epigrams[Math.floor(Math.random() * epigrams.length)];
    return randomElement;
  };

  const handleShow = () => {
    setModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
  };

  const onSubmit = (e) => {
    console.log(quote);
    console.log(author);
    const newEpigram = {
      quote: quote,
      author: author
    }
    fetch("/epigrams", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newEpigram),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div>
      {reload}
      <div className="text-center">
        <img src={logo} className="logo img-fluid text-center" alt="Epigram" />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 quote">
            <blockquote className="blockquote text-center random">
              <p>{getRandomEpigram()["quote"]}</p>
              <footer className="blockquote-footer">
                <cite title="Source Title">{getRandomEpigram()["author"]}</cite>
              </footer>
            </blockquote>
          </div>
          <div className="col-md-3"></div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setReload(!reload)}
            >
              Generate !
            </button>
            &nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => handleShow()}
            >
              Add my Epi..
            </button>
          </div>
        </div>
      </div>
      <EpigramModal
        show={modalShow}
        handleClose={() => handleClose()}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
        quote={quote}
        onChangeQuote={(e) => setQuote(e.target.value)}
        author={author}
        onChangeAuthor={(e) => setAuthor(e.target.value)}
      />
    </div>
  );
}

export default App;
