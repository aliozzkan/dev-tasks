import { auth } from "@/lib/auth";

export const POST = async (req: Request) => {
  const session = await auth();

  const { insertTask } = await import("@/data/task/task-data");
  const body = await req.json();

  const result = await insertTask({ ...body, userId: session?.userId });

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
