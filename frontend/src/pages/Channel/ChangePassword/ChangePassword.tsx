import React from 'react';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePassword: React.FC = () => {
    return (
        <div className="flex flex-wrap sm:flex-nowrap gap-2 px-2 w-full max-w-6xl mx-auto mt-4" >
            <div className='text-white md:w-full w-3/4'>
                <h2 className='font-semibold text-sm'>Password</h2>
                <p className='text-sm text-gray-300'>Please enter your current password to change your paswword</p>
            </div>
            <div className='mb-4 w-full'>
                <ChangePasswordForm />
            </div>
        </div >
    );
};

export default ChangePassword;