'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { z } from "zod"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signUp } from './auth.action'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const signUpSchema = z.object({
    firstname: z.string().min(2, "First name is required"),
    lastname: z.string().min(2, "Last name is required"),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
})

const SignUpForm = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        const res = await signUp(values)
        if (res.success) {
            toast.success('Account created successfully')
            router.push('/dashboard')
        } else {
            toast.error(res.error)
        }
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Card className='min-w-[500px]'>
            <CardHeader>
                <CardTitle>Begin your journey...</CardTitle>
                <CardDescription>
                    Create your account to continue.
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
                <Form {...form}>
                    <form className='flex flex-col gap-2' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='email'
                                            placeholder='Enter your email...'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='firstname'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter your first name...'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='lastname'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Enter your last name...'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder="Enter your password..."
                                            {...field}
                                            onChange={(e) => {
                                                e.target.value = e.target.value.trim();
                                                field.onChange(e);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            placeholder="Please confirm your password"
                                            {...field}
                                            onChange={(e) => {
                                                e.target.value = e.target.value.trim();
                                                field.onChange(e);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='self-start'>
                            Sign Up
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SignUpForm
