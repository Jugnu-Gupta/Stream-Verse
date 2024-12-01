import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import loadingGIf from '../assets/loading.gif';

const ProtectedLayout: React.FC = () => {
    const { loading } = useAuth();

    if (loading === true) {
        return (<div className='mx-auto my-auto'>
            <img src={loadingGIf} alt="loading" className='w-48' />
        </div>)
    }

    return (
        <Outlet />
    )
}

export default ProtectedLayout;