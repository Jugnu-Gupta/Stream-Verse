import React, { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const ProtectedAdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const { adminName } = useParams<{ adminName: string }>();
    const channelAdmin = "@" + (localStorage.getItem("userName") || "");

    console.log("AdminName:", adminName);
    console.log("channelAdmin:", channelAdmin);
    useEffect(() => {
        if (adminName !== channelAdmin) {
            navigate("/");
        }
    }, [adminName, channelAdmin, navigate]);

    return (
        <Outlet />
    );
};

export default ProtectedAdminLayout;
