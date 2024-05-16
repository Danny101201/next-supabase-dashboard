import React from "react";
import { ListNote } from "./components/ListNote";

export default function Notes() {
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Notes</h1>
      <div className="flex gap-2">
        <ListNote />
      </div>
    </div>
  );
}
