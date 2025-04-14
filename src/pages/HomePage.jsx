import React from "react";
import HomeHeader from "../components/Home/HomeHeader";
import HomeStats from "../components/Home/HomeStats";
import HomeActions from "../components/Home/HomeActions";

function HomePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F8F8F8]">
      <div className="w-full max-w-4xl py-12 px-4">
        <HomeHeader />
        <HomeStats />
        <HomeActions />
      </div>
    </div>
  );
}

export default HomePage;
