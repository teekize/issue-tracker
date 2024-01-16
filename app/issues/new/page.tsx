"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-5">
      <TextField.Root>
        <TextField.Input placeholder="new issue" />
      </TextField.Root>

      <TextArea placeholder="description"></TextArea>
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
