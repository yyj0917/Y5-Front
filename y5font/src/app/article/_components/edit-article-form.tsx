/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
const FormSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  content: z.string().min(2, { message: 'Description must be at least 2 characters.' }),
  accountAddress: z.string().min(2, { message: 'Wallet Address must be at least 2 characters.' }),
  ACCOUNT_PRIVATE_KEY: z.string().min(2, { message: 'Private Key must be at least 2 characters.' }),
  reference: z.string().min(2, { message: 'Source must be at least 2 characters.' }),
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
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: initialValues?.title || '',
      content: initialValues?.content || '', // content를 textarea로 매핑
      accountAddress: initialValues?.accountAddress || '',
      ACCOUNT_PRIVATE_KEY: initialValues?.ACCOUNT_PRIVATE_KEY || '',
      reference: initialValues?.reference || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 flex flex-col space-y-3">
        {[
          { name: 'title', label: 'Title', type: 'input', placeholder: 'Enter title' },
          { name: 'content', label: 'Description', type: 'textarea', placeholder: 'Enter description' },
        ].map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as keyof z.infer<typeof FormSchema>} // FormSchema 키와 일치
            render={({ field: controllerField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === 'textarea' ? (
                    <Textarea
                      placeholder={field.placeholder}
                      className="w-full h-[200px] rounded"
                      {...controllerField}
                    />
                  ) : (
                    <Input placeholder={field.placeholder} className="rounded" {...controllerField} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Wallet Address and Private Key */}
        <div className="flex gap-4 w-full">
          <FormField
            control={form.control}
            name="accountAddress"
            render={({ field: controllerField }) => (
              <FormItem className="flex-1">
                <FormLabel>Wallet Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter wallet address" className="rounded w-full" {...controllerField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ACCOUNT_PRIVATE_KEY"
            render={({ field: controllerField }) => (
              <FormItem className="flex-1">
                <FormLabel>Private Key</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      placeholder="private key"
                      type={showPassword ? 'text' : 'password'} // 비밀번호 숨김/표시
                      className="rounded"
                      {...controllerField}
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-dunamuMain text-xl">
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="reference"
          render={({ field: controllerField }) => (
            <FormItem>
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input placeholder="Enter source" className="rounded-xl" {...controllerField} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-between gap-2">
          <Button type="submit" className="w-full rounded bg-dunamuMain">
            Save
          </Button>
          <Button variant={'primary'} onClick={handleCancel} className="w-full rounded bg-dunamuMain">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
