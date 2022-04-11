import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [allPeople, setAllPeople] = useState([]);
  const [peopleFromFilms, setPeopleFromFilms] = useState([]);
  const [filmToggle, setFilmToggle] = useState(false);
  const [peopleToggle, setPeopleToggle] = useState(false);
  //! const [nothingToggle, setNothingToggle] = useState(false);

  const handleSetFilmToggle = () => {
    setFilmToggle(!filmToggle);
    setPeopleToggle(false);
  };

  const handleSetPeopleToggle = () => {
    setPeopleToggle(!peopleToggle);
    setFilmToggle(false);
  };

  const handleSetNothingToggle = () => {
    setFilmToggle(false);
    setPeopleToggle(false);
  };

  //! set this up to get the people list  and then reverse it to get what their movies are.

  // const tempPeople = []; //temp array
  // useEffect(() => {
  //   const peopleMatch = []; //this array will be mapped over
  //   const peopleIDs = allFilms.people.map(url.slice(-36)); //array of ids for characters who appear in a movie
  //   peopleIDs.forEach(id => {
  //     people.forEach(person => {
  //       if (person.id === id)
  //     })
  //   })
  // });

  useEffect(() => {
    if (allFilms.length && allPeople.length) {
      const tempPeople = [];

      allPeople.forEach((person) => {
        const personFilms = [];
        person.films.forEach((film) => {
          const filmID = film.slice(-36);
          allFilms.forEach((film) => {
            if (film.id === filmID) {
              personFilms.push(film);
            }
          });
        });
        const tempPerson = {
          ...person,
          films: personFilms,
        };
        tempPeople.push(tempPerson);
        console.log(tempPerson);
      });
      setPeopleFromFilms(tempPeople);
    }
  }, [allFilms, allPeople]);

  //     useEffect(() => {
  //         fetch("https://ghibliapi.herokuapp.com/films")
  //         .then((data) => data.json())
  //         .then((nicerData) => setAllFilms(nicerData))

  //     }, []);

  const getFilmData = async () => {
    try {
      // fetches data from the api
      const response1 = await fetch("https://ghibliapi.herokuapp.com/films"); // this is the fetch
      const filmsData = await response1.json(); // parses the response as JSON data to produce a JS object

      const response2 = await fetch("https://ghibliapi.herokuapp.com/people");
      const peopleData = await response2.json();

      //console.log(filmsData); // logs the people object
      setAllFilms(filmsData); // passes the people object to the people state, which is then sent to the People Component

      //console.log(peopleData);
      setAllPeople(peopleData);
    } catch (error) {
      console.log("womp womp"); // displays an error page if fetch is unsuccessful
    }
  };

  useEffect(() => {
    getFilmData();
  }, []);

  return (
    <div>
      <h1>This is Studio Ghibli!</h1>
      <div className="container">
        <button className="btn btn-success" onClick={(e) => handleSetFilmToggle(e)}>
          {filmToggle ? "Hide" : "Show"} Films
        </button>
        <button className="btn btn-success" onClick={(e) => handleSetPeopleToggle(e)}>
          {peopleToggle ? "Hide" : "Show"} People
        </button>
        {(filmToggle === true || peopleToggle === true) && (
          <button className="btn btn-success" onClick={(e) => handleSetNothingToggle(e)}>
            See Nothing
          </button>
        )}{" "}
      </div>
      {peopleToggle && (
        <div>
          {peopleFromFilms.map((person) => (
            <div key={person.id}>
              <p>{person.name}</p>
              <ul>
                {person.films.map((film) => (
                  <li key={person.id + "-" + film.id}>
                    {film.title}, released in {film.release_date}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* {!peopleToggle && (people.jsx here)} */}
    </div>
  );
};

export default App;
// {!filmToggle && (
//         <>
//           {allFilms.map((film) => (
//             <div key={`film-id${film.id}`}>
//               <div>{film.title}</div>
//               <ul>
//                 {allPeople.map((film) => (
//                   <li>{film.people}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </>
//       )}
