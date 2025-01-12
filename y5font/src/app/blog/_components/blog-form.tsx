'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PostBlogPosts } from '@/lib/api/blog-post';
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const FormSchema = z.object({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }),
  userwallet: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  privateKey: z.string().min(2, {
    message: 'Private Key must be at least 2 characters.',
  }),
  textarea: z.string().min(2, {
    message: 'Textarea must be at least 2 characters.',
  }),
  source: z.string().min(2, {
    message: 'Source must be at least 2 characters.',
  }),
});

export function BlogForm() {
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      userwallet: '',
      privateKey: '',
      textarea: '',
      source: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const formattedData = {
        ...data,
        source: data.source.split(',').map((item) => item.trim()), // ','로 분리 및 공백 제거
      };
      await PostBlogPosts(formattedData);
      alert('Success');
      window.location.href = '/blog/list';
    } catch (err) {
      console.log(err);
    }
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
      name: 'privateKey',
      label: 'Private Key',
      type: 'input',
      placeholder: 'Enter your private key',
    },
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 flex flex-col gap-2">
        {fields.map((field) => {
          if (field.name === 'userwallet') {
            // 분리된 User Wallet과 Private Key
            return (
              <FormItem key={`form-item-${field.name}`} className="flex gap-4 w-full h-auto items-center">
                <div className="flex-1 p-0">
                  <FormLabel>
                    <p className="font-bold mb-2">{field.label}</p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id={`walletAddress-${field.name}`}
                      placeholder={field.placeholder}
                      className="rounded w-full"
                      {...form.register('userwallet')}
                    />
                  </FormControl>
                </div>
                <div className="flex-1 p-0">
                  <FormLabel>
                    <p className="font-bold mb-2">Private Key</p>
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        id={`privateKey-${field.name}`}
                        placeholder="private key"
                        type={showPassword ? 'text' : 'password'} // 비밀번호 숨김/표시
                        className="mt-2 rounded"
                        {...form.register('privateKey')}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-dunamuMain text-xl">
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                  </div>
                </div>
              </FormItem>
            );
          } else if (field.name !== 'privateKey') {
            // 일반 필드
            return (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: controllerField }) => (
                  <FormItem>
                    <FormLabel>
                      <p className="font-bold mb-2">{field.label}</p>
                    </FormLabel>
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
                  </FormItem>
                )}
              />
            );
          }
        })}
        <Button type="submit" className="rounded bg-dunamuMain">
          Submit
        </Button>
      </form>
    </Form>
  );
}
