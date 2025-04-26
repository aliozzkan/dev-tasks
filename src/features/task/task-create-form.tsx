"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddTaskMutation } from "@/services/task/task.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import QueryButton from "../common/query-button";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

interface TaskCreateFormProps {
  onSuccess: () => void;
}

function TaskCreateForm(props: TaskCreateFormProps) {
  const [addTaskMutate, addTaskMutation] = useAddTaskMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onValid = async (values: z.infer<typeof formSchema>) => {
    await addTaskMutate({
      title: values.title,
      description: values.description,
      userId: "1",
    }).unwrap();

    if (addTaskMutation.isError) {
      alert("error");
    }

    setTimeout(() => {
      props.onSuccess();
    }, 1000);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValid)} className="space-y-8">
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

          <QueryButton
            queryStatus={addTaskMutation.status}
            type="submit"
            className="w-full"
          >
            Create
          </QueryButton>
        </form>
      </Form>
    </div>
  );
}

export default TaskCreateForm;
