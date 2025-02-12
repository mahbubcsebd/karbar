import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useUser from '@/hooks/useUser';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { encrypt } from '../services/encryption';
import { getUserDetails, loginUser, registerUser } from '../utils/auth/getAuth';

const AuthModal = ({ children, type = 'signIn' }) => {
    const [authType, setAuthType] = useState(type);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const { setUser } = useUser();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const password = watch('password');

    const toggleAuthType = () => {
        setAuthType((prevType) =>
            prevType === 'signIn' ? 'signUp' : 'signIn'
        );
        reset(); // Clear form when switching between sign in/up
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    const onSubmit = async (data) => {
        if (authType === 'signUp') {
            // Handle sign-up logic
            const userData = {
                name: data.fullName,
                phone: data.phone,
                email: data.username,
                password: data.password,
                password_confirmation: data.confirmPassword,
            };

            try {
                const response = await registerUser(JSON.stringify(userData));

                if (response.ok) {
                    const responseData = await response.json();

                    if (responseData.success) {
                        toast.success(`${responseData.message}`, {
                            position: 'bottom-right',
                        });

                        // Instead of closing modal, switch to sign in and pre-fill email
                        setAuthType('signIn');
                        reset(); // Clear all form fields
                        setValue('email', data.email); // Pre-fill email field
                    } else {
                        toast.error(`${responseData.message}`, {
                            position: 'bottom-right',
                        });
                    }
                } else {
                    throw new Error('Failed to register');
                }
            } catch (error) {
                console.error('Error during sign-up:', error);
            }
        } else if (authType === 'signIn') {
            const userData = {
                email_username: data.username,
                password: data.password,
                remember: data.remember,
            };

            try {
                const responseData = await loginUser(JSON.stringify(userData));
                const encryptedToken = encrypt(responseData.token);

                // Fetch user details
                const userDetails = await getUserDetails(responseData.token);
                setUser(userDetails.data);

                // Store user data in cookies
                Cookies.set('user', JSON.stringify(userDetails.data), {
                    expires: 3,
                    secure: true,
                    sameSite: 'Strict',
                });

                // Store token securely
                Cookies.set('userToken', encryptedToken, {
                    expires: 3,
                    secure: true,
                    sameSite: 'Strict',
                });

                // Show toast notification
                if (responseData.success) {
                    toast.success(`${responseData.message}`, {
                        position: 'bottom-right',
                    });
                } else {
                    toast.error(`${responseData.message}`, {
                        position: 'bottom-right',
                    });
                }

                // Close modal and reset form
                setOpen(false);
                reset();

                // Redirect to homepage
                router.push('/');
            } catch (error) {
                console.error('Login failed:', error.message);
                toast.error(error.message || 'An error occurred during login', {
                    position: 'bottom-right',
                });
            }
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogTrigger asChild area-label="login button">{children}</DialogTrigger>
                <DialogHeader className="sr-only">
                    <DialogTitle>Coupon</DialogTitle>
                    <DialogDescription>Coupon Description</DialogDescription>
                </DialogHeader>
                <DialogContent className="w-[350px] rounded-xl sm:max-w-[425px] p-6">
                    <h2 className="mb-4 text-3xl font-semibold text-center text-gray-900">
                        {authType === 'signIn' ? 'Sign In' : 'Sign Up'}
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {authType === 'signUp' && (
                            <>
                                <div>
                                    <label
                                        htmlFor="fullName"
                                        className="block mb-1 text-sm font-medium text-gray-900"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        {...register('fullName', {
                                            required: 'Full Name is required',
                                            minLength: {
                                                value: 3,
                                                message:
                                                    'Full Name must be at least 3 characters',
                                            },
                                        })}
                                        className={`block w-full px-3 py-2 border ${
                                            errors.fullName
                                                ? 'border-red-500'
                                                : 'border-[#D0D5DD]'
                                        } text-gray-700 ring-1 ring-inset ${
                                            errors.fullName
                                                ? 'ring-red-500'
                                                : 'ring-[#D0D5DD]'
                                        } focus:ring-1 focus:ring-blue-900 placeholder:text-gray-600 placeholder:text-sm outline-hidden rounded-md input-shadow bg-white`}
                                        placeholder="Enter your full name"
                                    />
                                    {errors.fullName && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.fullName.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="fullName"
                                        className="block mb-1 text-sm font-medium text-gray-900"
                                    >
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        {...register('phone', {
                                            required:
                                                'Phone Number is required',
                                            // minLength: {
                                            //     value: 3,
                                            //     message:
                                            //         'Full Name must be at least 3 characters',
                                            // },
                                        })}
                                        className={`block w-full px-3 py-2 border ${
                                            errors.phone
                                                ? 'border-red-500'
                                                : 'border-[#D0D5DD]'
                                        } text-gray-700 ring-1 ring-inset ${
                                            errors.phone
                                                ? 'ring-red-500'
                                                : 'ring-[#D0D5DD]'
                                        } focus:ring-1 focus:ring-blue-900 placeholder:text-gray-600 placeholder:text-sm outline-hidden rounded-md input-shadow bg-white`}
                                        placeholder="Enter your phone number"
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-1 text-sm font-medium text-gray-900"
                            >
                                Email Address{' '}
                                {authType === 'signIn' ? 'or Phone Number' : ''}
                            </label>
                            <input
                                type="text"
                                id="username"
                                {...register('username', {
                                    required:
                                        'Email or phone number is required',
                                    validate: (value) => {
                                        // ইমেইল ভ্যালিডেশন
                                        const emailRegex =
                                            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
                                        // ফোন নাম্বার ভ্যালিডেশন (৯-১৫ ডিজিট)
                                        const phoneRegex = /^[0-9]{9,15}$/;

                                        return (
                                            emailRegex.test(value) ||
                                            phoneRegex.test(value) ||
                                            'Please enter a valid email or phone number'
                                        );
                                    },
                                })}
                                className={`block w-full px-3 py-2 border ${
                                    errors.username
                                        ? 'border-red-500'
                                        : 'border-[#D0D5DD]'
                                } text-gray-700 ring-1 ring-inset ${
                                    errors.username
                                        ? 'ring-red-500'
                                        : 'ring-[#D0D5DD]'
                                } focus:ring-1 focus:ring-blue-900 placeholder:text-gray-600 placeholder:text-sm outline-hidden rounded-md input-shadow bg-white`}
                                placeholder={`Enter your email ${authType === 'signIn' ? 'or Phone Number' : ''}`}
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="block mb-1 text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password must be at least 8 characters',
                                    },
                                })}
                                className={`block w-full px-3 py-2 border ${
                                    errors.password
                                        ? 'border-red-500'
                                        : 'border-[#D0D5DD]'
                                } text-gray-700 ring-1 ring-inset ${
                                    errors.password
                                        ? 'ring-red-500'
                                        : 'ring-[#D0D5DD]'
                                } focus:ring-1 focus:ring-blue-900 placeholder:text-gray-600 placeholder:text-sm outline-hidden rounded-md input-shadow bg-white`}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute text-gray-500 right-3 top-9"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {authType === 'signUp' && (
                            <div className="relative">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block mb-1 text-sm font-medium text-gray-900"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    id="confirmPassword"
                                    {...register('confirmPassword', {
                                        required:
                                            'Please confirm your password',
                                        validate: (value) =>
                                            value === password ||
                                            'Passwords do not match',
                                    })}
                                    className={`block w-full px-3 py-2 border ${
                                        errors.confirmPassword
                                            ? 'border-red-500'
                                            : 'border-[#D0D5DD]'
                                    } text-gray-700 ring-1 ring-inset ${
                                        errors.confirmPassword
                                            ? 'ring-red-500'
                                            : 'ring-[#D0D5DD]'
                                    } focus:ring-1 focus:ring-blue-900 placeholder:text-gray-600 placeholder:text-sm outline-hidden rounded-md input-shadow bg-white`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute text-gray-500 right-3 top-9"
                                >
                                    {showConfirmPassword ? '🙈' : '👁️'}
                                </button>
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        )}

                        {authType === 'signIn' && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        {...register('remember')}
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="text-sm font-normal leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Remember Me
                                    </label>
                                </div>
                                <Link
                                    href="/"
                                    className="text-sm font-normal text-gray-700"
                                >
                                    Forgot Password
                                </Link>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full px-6 py-4 text-white transition bg-purple-900 rounded-md hover:bg-purple-900"
                        >
                            {authType === 'signIn' ? 'Sign In' : 'Sign Up'}
                        </button>
                    </form>

                    <p className="mt-4 text-sm font-normal text-center text-gray-700">
                        {authType === 'signIn' ? (
                            <>
                                Don&apos;t have an account?{' '}
                                <button
                                    type="button"
                                    onClick={toggleAuthType}
                                    className="text-blue-700 underline"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={toggleAuthType}
                                    className="text-blue-600 underline"
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </p>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AuthModal;
