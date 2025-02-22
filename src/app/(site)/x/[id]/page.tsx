import Image from "next/image";
import React from "react";

const TreeDetailsPage = ({}) => {
  const {
    name,
    species,
    image,
    carbonOffset,
    platedAt,
    latitude,
    longitude,
    treePlantingOrgId,
  } = {
    name: "Tree Name",
    species: "Tree Species",
    image: "/tree.jpg",
    carbonOffset: 1000,
    platedAt: "2021-09-01",
    latitude: 17.385,
    longitude: 78.4867,
    treePlantingOrgId: "org_123",
  };

  return (
    <div className="min-h-screen p-16 px-48">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
          width={300}
          height={400}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">{name}</h1>
        </div>
      </div>

      {/* Details Section */}
      <div className="container mx-auto p-6">
        <div className="rounded-lg shadow-lg p-6 border border-gray-200 bg-white">
          <h2 className="text-2xl font-bold mb-4">Tree Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-gray-600">Species:</span>
              <span className="ml-2 font-semibold">{species}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Carbon Offset:</span>
              <span className="ml-2 font-semibold">{carbonOffset} kg</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Planted At:</span>
              <span className="ml-2 font-semibold">{platedAt}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Location:</span>
              <span className="ml-2 font-semibold">
                {latitude}, {longitude}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">Organization ID:</span>
              <span className="ml-2 font-semibold">{treePlantingOrgId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Tree Location</h2>
          <div className="h-64 bg-gray-200">{/* Embed Map Here */}</div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Environmental Impact</h2>
          <div className="flex items-center">
            <span className="text-gray-600">Carbon Offset Progress:</span>
            <div className="ml-4 w-64 h-4 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${(carbonOffset / 1000) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            This tree will offset approximately {carbonOffset} kg of CO2 over
            its lifetime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TreeDetailsPage;
