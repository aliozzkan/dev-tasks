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

export const GET = async () => {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { getTasks } = await import("@/data/task/task-data");

  const result = await getTasks(session.userId);

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const PATCH = async (req: Request) => {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { updateTask } = await import("@/data/task/task-data");
  const body = await req.json();

  const result = await updateTask({ ...body });

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
