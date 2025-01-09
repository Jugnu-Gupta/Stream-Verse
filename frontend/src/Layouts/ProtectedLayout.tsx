import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import loadingGIF from '../assets/loading.gif';

const ProtectedLayout: React.FC = () => {
    const { loading } = useAuth();

    if (loading === true) {
        return (<div className='mx-auto my-auto'>
            <img src={loadingGIF} alt="loading" loading='lazy' className='w-24' />
        </div>)
    }

    return (
        <Outlet />
    )
}

export default ProtectedLayout;