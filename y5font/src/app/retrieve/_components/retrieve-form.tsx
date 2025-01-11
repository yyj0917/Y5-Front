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
  walletAddress: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
});

export function RetrieveForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      walletAddress: '',
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 flex flex-col space-y-3">
        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field: controllerField }) => (
            <FormItem>
              <FormLabel>Enter the Wallet Address</FormLabel>
              <FormDescription>Check the list of posts written through your wallet address.</FormDescription>
              <FormControl>
                <Input placeholder="Enter wallet address" className="rounded-xl" {...controllerField} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-xl bg-upBitLightBlue">
          Submit
        </Button>
      </form>
    </Form>
  );
}
