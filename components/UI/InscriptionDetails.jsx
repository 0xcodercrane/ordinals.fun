import React from "react";

export default function InscriptionDetails({ data, content }) {

  console.log(data)
  return (
    <div className="p-3 dark:bg-primary-dark/20 bg-primary-light/10 rounded-lg">
      {content ? (
        <div className="text-3xl font-bold px-3">{content}</div>
      ) : (
        <div className="animate-pulse dark:bg-primary-dark/20 bg-primary-light/20 rounded-sm h-8 w-32"></div>
      )}

      <div className="rounded-lg p-3 divide-primary-dark/40 divide-y">
        <div className="py-2">
          <p className="text-sm dark:text-gray-300 text-gray-800">Inscription ID</p>
          {data?.inscriptionId ? (
            <p className="break-words">{data?.inscriptionId}</p>
          ) : (
            <div className="animate-pulse dark:bg-primary-dark/20 bg-primary-light/20 rounded-sm h-6"></div>
          )}
        </div>
        <div className="py-2">
          <p className="text-sm dark:text-gray-300 text-gray-800">Owner</p>
          {data?.address ? (
            <p className="break-words">{data?.address}</p>
          ) : (
            <div className="animate-pulse dark:bg-primary-dark/20 bg-primary-light/20 rounded-sm h-6"></div>
          )}
        </div>
        <div className="py-2">
          <p className="text-sm dark:text-gray-300 text-gray-800">Output value</p>
          {data?.outputValue ? (
            <p className="break-words">{data?.outputValue}</p>
          ) : (
            <div className="animate-pulse dark:bg-primary-dark/20 bg-primary-light/20 rounded-sm h-6"></div>
          )}
        </div>
        <div className="py-2">
          <p className="text-sm dark:text-gray-300 text-gray-800">Content Length</p>
          {data?.contentLength ? (
            <p className="break-words">{data?.contentLength}</p>
          ) : (
            <div className="animate-pulse dark:bg-primary-dark/20 bg-primary-light/20 rounded-sm h-6"></div>
          )}
        </div>
        <div className="py-2">
          <p className="text-sm dark:text-gray-300 text-gray-800">Content Type</p>
          {data?.contentType ? (
            <p className="break-words">{data?.contentType}</p>
          ) : (
            <div className="animate-pulse dark:bg-primary-dark/20 bg-primary-light/20 rounded-sm h-6"></div>
          )}
        </div>
        <div className="py-2">
          <p className="text-sm dark:text-gray-300 text-gray-800">Inscription Number</p>
          {data?.inscriptionNumber ? (
            <p className="break-words">{data?.inscriptionNumber}</p>
          ) : (
            <div className="animate-pulse dark:bg-primary-dark/20 bg-primary-light/20 rounded-sm h-6"></div>
          )}
        </div>
        <div className="py-2">
          <p className="text-sm dark:text-gray-300 text-gray-800">Created</p>
          {data?.timestamp ? (
            <p className="break-words">
              {new Date(data?.timestamp * 1000).toString()}
            </p>
          ) : (
            <div className="animate-pulse dark:bg-primary-dark/20 bg-primary-light/20 rounded-sm h-6"></div>
          )}
        </div>
        <div className="py-2">
          <p className="text-sm dark:text-gray-300 text-gray-800">Preview</p>
          {data?.preview ? (
            <a href={data?.preview} target="_blank" className="break-words">
              {data?.preview}
            </a>
          ) : (
            <div className="animate-pulse dark:bg-primary-dark/20 bg-primary-light/20 rounded-sm h-6"></div>
          )}
        </div>
        <div className="py-2">
          <p className="text-sm dark:text-gray-300 text-gray-800">Indexer</p>
          {data?.inscriptionId ? (
            <a
              href={
                "https://ordinalslite.com/inscription/" + data?.inscriptionId
              }
              target="_blank"
              className="break-words"
            >
              {data?.inscriptionId}
            </a>
          ) : (
            <div className="animate-pulse dark:bg-primary-dark/20 bg-primary-light/20 rounded-sm h-6"></div>
          )}
        </div>
      </div>
    </div>
  );
}
