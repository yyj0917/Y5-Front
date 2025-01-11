import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
const FormSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  textarea: z.string().min(2, { message: 'Description must be at least 2 characters.' }),
  walletAddress: z.string().min(2, { message: 'Wallet Address must be at least 2 characters.' }),
  source: z.string().min(2, { message: 'Source must be at least 2 characters.' }),
});

export function EditArticleForm({
  initialValues,
  onSubmit,
  handleCancel,
}: {
  initialValues: any;
  onSubmit: (data: any) => void;
  handleCancel: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 flex flex-col space-y-3">
        {[
          { name: 'title', label: 'Title', type: 'input', placeholder: 'Enter title' },
          { name: 'textarea', label: 'Description', type: 'textarea', placeholder: 'Enter description' },
          { name: 'walletAddress', label: 'Wallet Address', type: 'input', placeholder: 'Enter wallet address' },
          { name: 'source', label: 'Source', type: 'input', placeholder: 'Enter source' },
        ].map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
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
        <div className="w-full flex justify-betwee gap-2">
          <Button type="submit" className="w-full rounded-xl bg-upBitLightBlue">
            Save
          </Button>
          <Button variant={'primary'} onClick={handleCancel} className="w-full rounded-xl bg-upBitLightBlue">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
