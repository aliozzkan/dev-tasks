"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

interface TaskCreateFormProps {
  onSuccess: () => void;
}

function TaskCreateForm(props: TaskCreateFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onValid = async (values: z.infer<typeof formSchema>) => {
    setStatus("loading");
    try {
      await fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(values),
      });
      setStatus("done");
    } catch (error) {
      console.error("Error creating task:", error);
      setStatus("error");
    } finally {
      setTimeout(() => {
        setStatus("idle");
        form.reset();
        props.onSuccess();
      }, 1000);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValid)} className="space-y-4">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <Textarea {...field} className="resize-none" />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" size="lg">
            {status === "loading" && "Creating..."}
            {status === "done" && "Created!"}
            {status === "error" && "Error!"}
            {status === "idle" && "Create Task"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default TaskCreateForm;
