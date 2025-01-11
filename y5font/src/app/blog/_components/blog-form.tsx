'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  userwallet: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  textarea: z.string().min(2, {
    message: 'Textarea must be at least 2 characters.',
  }),
  source: z.string().min(2, {
    message: 'Source must be at least 2 characters.',
  }),
});

export function BlogForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      userwallet: '',
      textarea: '',
      source: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  const fields: Array<{
    name: keyof z.infer<typeof FormSchema>; // FormSchema의 키 중 하나
    label: string;
    type: 'input' | 'textarea';
    placeholder: string;
  }> = [
    { name: 'title', label: 'Title', type: 'input', placeholder: 'Enter the blog title' },
    { name: 'userwallet', label: 'User Wallet', type: 'input', placeholder: 'Enter the your coin wallet address' },
    {
      name: 'textarea',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Please write what you want to write. The form is free.',
    },
    { name: 'source', label: 'Source', type: 'input', placeholder: 'Enter the source' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 flex flex-col space-y-3">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={`${field.name}`}
            render={({ field: controllerField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === 'textarea' ? (
                    <Textarea
                      placeholder={field.placeholder}
                      className="w-full h-[200px] rounded-xl"
                      {...controllerField}
                    />
                  ) : (
                    <Input placeholder={field.placeholder} className="rounded-xl" {...controllerField} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="rounded-xl bg-upBitLightBlue">
          Submit
        </Button>
      </form>
    </Form>
  );
}
