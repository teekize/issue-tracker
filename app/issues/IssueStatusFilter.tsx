"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: { label: string; status?: Status }[] = [
  { label: "All" },
  { label: "Open", status: "OPEN" },
  { label: "In Progress", status: "IN_PROGRESS" },
  { label: "Closed", status: "CLOSED" },
];

const IssueStatusFilter = () => {
    const router= useRouter()
  return (
      <Select.Root onValueChange={(status) => {
          const query= status==="o"?"":"?status="+status
          router.push("/issues"+query)
    }}>
      <Select.Trigger placeholder="Filter status ..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item value={status.status || "o"}>{status.label}</Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
