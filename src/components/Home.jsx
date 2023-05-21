import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="flex bg-gradient-to-r from-red-100 to-orange-100 h-96">
      <div className="container mx-auto flex justify-center items-center flex-col">
        <h1 className="text-black text-4xl md:text-5xl font-bold text-center w-1/2">
          Buy and Sell Gabi Products
        </h1>
        <Link
          to="/products"
          className="mt-9 bg-red-400 px-12 py-3 rounded-3xl hover:bg-red-500 text-white"
          role="button"
        >
          Shop now!
        </Link>
      </div>
    </section>
  );
}

export default Home;
