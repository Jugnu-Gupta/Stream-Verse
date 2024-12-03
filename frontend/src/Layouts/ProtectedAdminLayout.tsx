import React, { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const ProtectedAdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const { AdminName } = useParams<{ AdminName: string }>();
    const channelAdmin = "@" + (localStorage.getItem("userName") || "");

    console.log("AdminName:", AdminName);
    console.log("channelAdmin:", channelAdmin);
    useEffect(() => {
        if (AdminName !== channelAdmin) {
            navigate("/");
        }
    }, [AdminName, channelAdmin, navigate]);

    return (
        <Outlet />
    );
};

export default ProtectedAdminLayout;
