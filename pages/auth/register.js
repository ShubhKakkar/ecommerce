import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <div><form className='mx-auto max-w-screen-md'>
    <h1 className='mb-4 text-xl'>
        Login
    </h1>
    <div className='mb-4'>
        <label htmlFor='email'>
            Email
        </label>
        <input type='email' name='email' id='email' placeholder="webkoala1998@gmail.com" className='w-full' autoFocus />
    </div>
    <div className='mb-4'>
        <label htmlFor='password'>
            Password
        </label>
        <input type='password' name='password' id='password' className='w-full' aitoFocus />
    </div>
    <div className='mb-4'>
        <button className='primary-button'>
            Login
        </button>
    </div>
    <div className='mb-4'>
        Already have an account? &nbsp;
        <Link href="/auth/login">login</Link>
    </div>
</form></div>
  )
}

export default Register