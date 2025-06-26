'use client';

import { signin } from '@/app/api/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SigninFormSchema } from '@/utils/validators/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, startTransition, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
    const [state, action, isPending] = useActionState(signin, undefined);
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<z.infer<typeof SigninFormSchema>>({
        resolver: zodResolver(SigninFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof SigninFormSchema>) => {
        const formData = new FormData();
        formData.append('email', data.email);
        formData.append('password', data.password);

        setSubmitting(true);

        startTransition(() => {
            action(formData);
        });
    };

    useEffect(() => {
        setSubmitting(false);
        if (state?.errors) {
            Object.entries(state.errors).forEach(([key, value]) => {
                form.setError(key as keyof z.infer<typeof SigninFormSchema>, {
                    message: value?.[0],
                });
            });
        }
    }, [state, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col p-4 items-center justify-center h-full space-y-8"
            >
                <h1 className="text-violet-800 text-3xl">Lojita</h1>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-2/3">
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input placeholder="example@example.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-2/3">
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input placeholder="Sua senha" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-2/3" disabled={isPending || submitting}>
                    {isPending || submitting ? 'Entrando...' : 'Login'}
                </Button>

                {state?.message && (
                    <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertTitle>Não foi possível fazer login</AlertTitle>
                        <AlertDescription>
                            <p>{state.message}</p>

                        </AlertDescription>
                    </Alert>
                )}
            </form>
        </Form>
    );
}
