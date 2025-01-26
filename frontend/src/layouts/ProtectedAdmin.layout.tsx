import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const ProtectedAdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const { adminName } = useParams<{ adminName: string }>();
    const channelAdmin = "@" + (localStorage.getItem("userName") || "");

    useEffect(() => {
        if (adminName !== channelAdmin) {
            toast.error("Please login to view your Channel.");
            navigate("/");
        }
    }, [adminName, channelAdmin, navigate]);

    return (
        <Outlet />
    );
};

export default ProtectedAdminLayout;
