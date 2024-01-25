"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const Assignee = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) return null;

  if (isLoading) return <Skeleton />;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "0"}
      size="3"
      onValueChange={(userId) =>
        axios.patch("/api/issue/" + issue.id, {
          assignedToUserId: userId === "0" ? null : userId,
        })
      }
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="0">Unassigned </Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default Assignee;
