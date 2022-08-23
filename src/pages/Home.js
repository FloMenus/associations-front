import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Card from "../components/Card";
import Navbar from "../components/Navbar";

function Home() {
  const [associations, setAssociations] = useState([]);

  useEffect(() => {
    fetchingAssociations();
  }, []);

  const fetchingAssociations = async () => {
    const request = await fetch("http://localhost:8000/associations");
    const response = await request.json();
    setAssociations(response);
  };

  if (!associations) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="flex flex-row flex-wrap gap-2.5 justify-center bg-gradient-to-r from-cyan-500 to-blue-500 p-5">
          {associations.map((association) => (
            <Link to={`/${association.slug}`}>
              <Card
                slug={association.slug}
                name={association.name}
                image={association.image}
                slogan={association.slogan}
                description={association.description}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
