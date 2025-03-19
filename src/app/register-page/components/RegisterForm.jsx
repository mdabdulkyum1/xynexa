'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaGoogle, FaUserPlus } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { FaTwitter } from 'react-icons/fa';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa6';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordShow, setPasswordShow] = useState(false);

  const handleRegistrationFromSubmit = data => {
    console.log('Form Data:', data);
  };

  return (
    <div className="p-5 md:p-10 lg:p-16 space-y-5">
      <h4 className="text-[#946ef7] text-3xl lg:text-4xl font-bold uppercase">
        Register Form
      </h4>

      <form
        onSubmit={handleSubmit(handleRegistrationFromSubmit)}
        className="w-full lg:w-2/3 space-y-5"
      >
        {/* Name Field */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register('name', { required: 'Name is required' })}
            className="input input-bordered border w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email',
              },
            })}
            className="input input-bordered border w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="form-control  w-full relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={passwordShow ? 'text' : 'password'}
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            className="input input-bordered border w-full"
          />
          <button
            type="button"
            className="absolute right-5 top-9 text-sm text-gray-500"
            onClick={() => setPasswordShow(!passwordShow)}
          >
            {passwordShow ? (
              <span>
                <IoEyeOff />
              </span>
            ) : (
              <span>
                <FaEye />
              </span>
            )}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="form-control  w-full">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              {...register('terms', { required: 'You must accept the terms' })}
              className="checkbox border"
            />
            <span className="label-text">
              Accept all our terms and conditions.
            </span>
          </label>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="form-control  w-full mt-6">
          <button
            type="submit"
            className="btn bg-[#946ef7] py-2 border-none rounded-none rounded-br-lg rounded-tl-lg w-full text-white"
          >
            <FaUserPlus className="text-lg" /> sign up
          </button>
        </div>
      </form>

      <div className="divider w-full lg:w-2/3 my-10">Sign up using</div>

      <div className="w-full lg:w-2/3  flex items-center justify-around">
        <button className="btn  bg-[#e6162d] text-white border-none ">
          <FaGoogle className="text-xl" /> Google
        </button>
        <button className="btn  bg-[#1da1f2] text-white border-none ">
          <FaTwitter className="text-xl" /> Twitter
        </button>
        <button className="btn  bg-[#3b5998] text-white border-none ">
          <FaFacebookF className="text-xl" /> Facebook
        </button>
        <button className="btn  bg-[#0077b5] text-white border-none ">
          <FaLinkedinIn className="text-xl" /> Linkedin
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
