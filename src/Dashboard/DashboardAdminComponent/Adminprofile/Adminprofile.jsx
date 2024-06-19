import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAxiosCommon from '../../../Hooks/useAxiosCommon';
import useAuth from '../../../Hooks/useAuth';
import { HiOutlineUser, HiOutlineMail } from 'react-icons/hi'; 
import Spinner from '../../../Component/Spinner';

function Adminprofile() {
    const [adminData, setAdminData] = useState(null);
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();
    console.log(user)
    useEffect(() => {
        axiosCommon.get('/admin-state')
            .then(res => {
                console.log(res);
                setAdminData(res.data);
            })
            .catch(error => {
                console.error('Error fetching admin state:', error);
            });
    }, []);

    if (!adminData) {
        return <Spinner></Spinner>
    }

    const { admin, users, agreement, members, rooms, percentageAvailableRooms, percentageUnavailableRooms } = adminData;

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center mb-6">
                    <img className="w-20 h-20 rounded-full mr-4" src={user?.photoURL} alt="User Profile" />
                    <div>
                        <h2 className="text-2xl font-bold flex items-center">
                            <HiOutlineUser className="text-gray-600 mr-2" />
                            {user?.display}
                        </h2>
                        <p className="flex items-center text-gray-600">
                            <HiOutlineMail className="text-gray-500 mr-2" />
                            {user?.email}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
                        <HiOutlineUser className="text-gray-500 w-8 h-8 mr-2" />
                        <div>
                            <h3 className="text-lg font-semibold">Total Number of Rooms</h3>
                            <p className="text-2xl">{rooms}</p>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
                        <HiOutlineUser className="text-gray-500 w-8 h-8 mr-2" />
                        <div>
                            <h3 className="text-lg font-semibold">Available Rooms</h3>
                            <p className="text-2xl">{percentageAvailableRooms.toFixed(2)}%</p>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
                        <HiOutlineUser className="text-gray-500 w-8 h-8 mr-2" />
                        <div>
                            <h3 className="text-lg font-semibold">Unavailable Rooms</h3>
                            <p className="text-2xl">{percentageUnavailableRooms.toFixed(2)}%</p>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
                        <HiOutlineUser className="text-gray-500 w-8 h-8 mr-2" />
                        <div>
                            <h3 className="text-lg font-semibold">Number of Users</h3>
                            <p className="text-2xl">{users}</p>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-center">
                        <HiOutlineUser className="text-gray-500 w-8 h-8 mr-2" />
                        <div>
                            <h3 className="text-lg font-semibold">Number of Members</h3>
                            <p className="text-2xl">{members}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Adminprofile;
