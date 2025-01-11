// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // 아이콘 추가
import { BadgeEuro } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

const formSchema = z.object({
  userWalletAddress: z.string().min(8),
  privateKey: z.string().min(8),
});
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userWalletAddress: '',
      privateKey: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      <div className="border-dunamuMain border-2 rounded-3xl w-[400px] h-[400px] p-10 flex flex-col justify-around shadow-md">
        <h1 className="flex justify-center items-center gap-2 text-2xl font-bold text-dunamuMain">
          <span>NFT 토큰 발행</span>
          <span>
            <BadgeEuro strokeWidth={2.5} />
          </span>
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="userWalletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Wallet Address</FormLabel>
                  <FormControl>
                    <Input placeholder="ex) 0x123456..." className="mt-2 rounded" {...field} />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privateKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Private Key</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="private key"
                        type={showPassword ? 'text' : 'password'} // 비밀번호 숨김/표시
                        {...field}
                        className="mt-2 rounded"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-dunamuMain text-xl">
                      {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                  </div>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <div className="w-full flex gap-2">
              <Button variant={'primary'} type="submit" className="flex-1 bg-dunamuMain rounded">
                Submit
              </Button>
              <Link href={'/'}>
                <Button
                  variant={'primary'}
                  type="submit"
                  className="flex-1 border-dunamuMain border-2 bg-white text-dunamuMain rounded hover:bg-slate-50">
                  준비중인 기능입니다
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
