import React, { useState } from "react";
import Layout from "@/components/sections/Layout";
import { collectionsData } from "../configs/constants";
import CollectionTr from "../components/UI/CollectionTr";

export default function collections() {
  return (
    <Layout>
      <div className="text-4xl text-center py-4">
        <h2>NFT Collections</h2>
        <p className="text-sm text-center w-full max-w-[900px] my-3 mx-auto lg:px-[150px]">
          NFT PSBT market place on Litecoin.
        </p>
      </div>
      <div className="my-3 w-full">
        <table class="table-auto w-full">
          <thead>
            <tr className="px-[6px!important] my-[4px!important]">
              <th class="px-1 lg:px-3 py-1">#</th>
              <th class="py-1">Logo</th>
              <th class="py-1">Name</th>
              <th class="py-1 hidden lg:inline-block">Description</th>
              <th class="py-1">Link</th>
              <th class="py-1 hidden lg:inline-block">Supply</th>
            </tr> 
          </thead>
          <tbody>
            {collectionsData.map((collection, key) => {
              return (
                <CollectionTr key={key} collection={collection} index={key} />
              );
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
