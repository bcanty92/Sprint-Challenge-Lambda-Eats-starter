import React from "react";
import { Route, Link } from "react-router-dom"

export default function Home() {



    return (
        <div>
            <h1>Lambda Eats</h1>
            <nav>

                <Link to="/pizza" style={{ margin: "2%" }}>Order Here</Link>
            </nav>

        </div>
    );
}