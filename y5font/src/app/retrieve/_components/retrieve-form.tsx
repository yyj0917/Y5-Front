import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  walletAddress: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
});
interface RetrieveFormProps {
  handleSubmit: (walletAddress: string) => void;
}
export function RetrieveForm({ handleSubmit }: RetrieveFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      walletAddress: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
        handleSubmit(data.walletAddress);
        
    } catch (error) {
      // 에러 처리
      const statusCode = parseInt((error as Error).message, 10);

      if (statusCode === 401) {
        toast({
          title: 'Unauthorized',
          description: 'Invalid account_address or unauthorized access.',
          variant: 'destructive', // 실패 시 스타일 지정
        });
      } else if (statusCode === 400) {
        toast({
          title: 'Bad Request',
          description: 'Required field is missing. Please check your input.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again later.',
          variant: 'destructive',
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 flex flex-col gap-5">
        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field: controllerField }) => (
            <FormItem>
              <div className="flex flex-col gap-3">
                <FormLabel>
                  <span className="text-dunamuMain font-bold">Enter the Wallet Address</span>
                </FormLabel>
                <FormDescription>
                  <span className="text-black font-semibold">
                    Check the list of posts written through your wallet address.
                  </span>
                </FormDescription>
                <FormControl>
                  <Input placeholder="Enter wallet address" className="rounded-xl" {...controllerField} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="rounded-xl bg-dunamuMain">
          Submit
        </Button>
      </form>
    </Form>
  );
}
