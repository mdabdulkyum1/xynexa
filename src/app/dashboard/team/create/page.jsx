"use client";
import { useState } from "react";
import CreateBoard from "./components/CreateBoard";

export default function CreatePage() {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <CreateBoard open={open} setOpen={setOpen} /> 
    </div>
  );
}
