import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../prisma/client";

const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(20),
  description: z.string().min(1, "Description is required"),
});

export async function POST(req: NextRequest) {
  // get issue , validate issue , response
  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
