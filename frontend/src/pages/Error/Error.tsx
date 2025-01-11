import React from 'react';
import ErrorImg from '../../assets/circleLogo.png';
import { useNavigate } from 'react-router-dom';

const Error: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='text-center flex flex-col justify-center items-center w-full bg-background-primary h-screen'>
            <img src={ErrorImg} alt="" className=' aspect-square w-24' />
            <h1 className='text-primary-text pt-6'>This page isn't available. Sorry about that.</h1>
            <button onClick={() => navigate("/")} className='text-primary-text 
                font-bold bg-orange rounded-md px-4 py-1 mt-2 underline'>Go to Home Page</button>
        </div>
    )
}

export default Error;