import React from "react";

export default function Banner() {
  return (
    <div className="text-4xl text-center py-4">
      <h2>Inscribe LiteMap</h2>
      <p className="text-sm text-center w-full max-w-[900px] my-3 mx-auto lg:px-[150px]">
        LiteMap only charges the service fee for the first 25 inscriptions in a
        single inscribing batch order, up to a maximum of 1000 inscriptions.
      </p>
    </div>
  );
}
