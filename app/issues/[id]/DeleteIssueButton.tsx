"use client";
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
           
            <Button color="red" disabled={isDeleting}>
              Delete Issue {isDeleting && <Spinner />}
            </Button>
          
        </AlertDialog.Trigger>

        <AlertDialog.Content>
          <AlertDialog.Title>Confrim Delete Issue</AlertDialog.Title>
          <AlertDialog.Description>
            The issue is going to be permanently deleted
          </AlertDialog.Description>

          <Flex mt="4" gap="3">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                color="red"
                onClick={async () => {
                  try {
                    setDeleting(true);
                    await axios.delete("/api/issue/" + issueId);
                    router.push("/issues");
                    router.refresh();
                  } catch (error) {
                    setDeleting(false);
                    setError(true);
                  }
                }}
              >
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be deleted
          </AlertDialog.Description>
          <AlertDialog.Action>
            <Button mt="3" color="gray" onClick={() => setError(false)}>
              Okay
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
