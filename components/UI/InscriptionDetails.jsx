import React from "react";

export default function InscriptionDetails({ data, content }) {
  return (
    <div className="p-3 bg-primary/10 rounded-lg">
      <div className="text-3xl font-bold px-3">{content}</div>
      <div className="rounded-lg p-3 divide-primary/40 divide-y">
        <div className="py-2">
          <p className="text-sm text-gray-300">Inscription ID</p>
          <p className="break-words">{data?.inscriptionId}</p>
        </div>
        <div className="py-2">
          <p className="text-sm text-gray-300">Owner</p>
          <p className="break-words">{data?.address}</p>
        </div>
        <div className="py-2">
          <p className="text-sm text-gray-300">Output value</p>
          <p className="break-words">{data?.outputValue}</p>
        </div>
        <div className="py-2">
          <p className="text-sm text-gray-300">Content Length</p>
          <p className="break-words">{data?.contentLength}</p>
        </div>
        <div className="py-2">
          <p className="text-sm text-gray-300">Content Type</p>
          <p className="break-words">{data?.contentType}</p>
        </div>
        <div className="py-2">
          <p className="text-sm text-gray-300">Inscription Number</p>
          <p className="break-words">{data?.inscriptionNumber}</p>
        </div>
        <div className="py-2">
          <p className="text-sm text-gray-300">Created</p>
          <p className="break-words">
            {new Date(data?.timestamp * 1000).toString()}
          </p>
        </div>
        <div className="py-2">
          <p className="text-sm text-gray-300">Preview</p>
          <a href={data?.preview} target="_blank" className="break-words">
            {data?.preview}
          </a>
        </div>
        <div className="py-2">
          <p className="text-sm text-gray-300">Indexer</p>
          <a
            href={"https://ordinalslite.com/inscription/" + data?.inscriptionId}
            target="_blank"
            className="break-words"
          >
            {data?.inscriptionId}
          </a>
        </div>
      </div>
    </div>
  );
}
