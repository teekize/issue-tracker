"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const Assignee = () => {
  return (
    <Select.Root size="3">
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="1">Elvis Teeka</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default Assignee;
