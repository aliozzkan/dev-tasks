import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

export default function Login() {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
