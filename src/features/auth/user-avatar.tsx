import { auth } from "@/lib/auth";

export default async function UserInfo() {
  const session = await auth();
  console.log("session", session);

  if (!session?.user) return null;

  return <div>{JSON.stringify(session.userId)}</div>;
}
