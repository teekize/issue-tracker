import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import prisma from "../../../prisma/client";

import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import IssueDetail from "./IssueDetailPage";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import Assignee from "./Assignee";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap="5">
            <Assignee issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
