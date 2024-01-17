import { Button } from '@radix-ui/themes'
import React from 'react'
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from 'next/link';

const EditIssueButton = ({issueId}:{issueId:  Number}) => {
  return (
    <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
        </Button>
  )
}

export default EditIssueButton