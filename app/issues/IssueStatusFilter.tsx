"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const statuses: { label: string; status?: Status }[] = [
  { label: "All" },
  { label: "Open", status: "OPEN" },
  { label: "In Progress", status: "IN_PROGRESS" },
  { label: "Closed", status: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
      <Select.Root
          defaultValue={searchParams.get("status")||"o"}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) {
          if (status === "o") params.append("status", "");
          else {
            params.append("status", status);
          }
        }
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues" + query);
      }}
    >
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
