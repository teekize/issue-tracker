import { Flex, Table } from "@radix-ui/themes";
import prisma from "../../prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { Link } from "../components";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";
import { Metadata } from "next";

const Issues = async ({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Title", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  const validStatus = Object.values(Status);
  const status = validStatus.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell key={col.value} className={col.className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: col.value },
                  }}
                >
                  {col.label}
                </NextLink>
                {col.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default Issues;

export const metadata: Metadata = {
  title: "Issue Tracker - issue list",
  description: "View a list of project issues",
};