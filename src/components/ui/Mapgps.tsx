"use client";
import React, { useState } from "react";

type Props = {
  trip: {
    map_url?: string;
  };
};

function Mapgps({ trip }: Props) {
  const [loadMap, setLoadMap] = useState(false);

  if (!trip?.map_url) return null;

  return (
    <div className="mt-10">
      <div className="overflow-hidden rounded-xl border">
        {!loadMap ? (
          <button
            onClick={() => setLoadMap(true)}
            className="flex h-[350px] w-full items-center justify-center bg-muted text-sm text-text-secondary"
          >
            Click to load map
          </button>
        ) : (
          <iframe
            src={trip.map_url}
            width="100%"
            height="350"
            loading="lazy"
            className="border-0"
          />
        )}
      </div>
    </div>
  );
}

export default Mapgps;
