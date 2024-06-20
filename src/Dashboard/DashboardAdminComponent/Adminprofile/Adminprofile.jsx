import React, { useEffect, useState } from 'react';
import useAxiosCommon from '../../../Hooks/useAxiosCommon';
import useAuth from '../../../Hooks/useAuth';
import { HiOutlineUser, HiOutlineMail } from 'react-icons/hi'; 
import Spinner from '../../../Component/Spinner';
import { MdMeetingRoom } from 'react-icons/md';

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
            <div className="bg-[#FFFFFF] py-20 border-2 shadow-2xl rounded-lg p-6">
                <div className="md:flex items-center mb-6 bg-[#D6BCFD] p-3 rounded-lg">
                    <img className="w-20 h-20 rounded-full mr-4" src={user?.photoURL} alt="User Profile" />
                    <div>
                        <h2 className="md:text-2xl font-bold flex items-center">
                            <HiOutlineUser className="text-gray-600 mr-2" />
                            {user?.displayName}
                        </h2>
                        <p className="flex items-center overflow-auto text-gray-600">
                            <HiOutlineMail className="text-gray-500 md:text-2xl mr-2 " />
                            {user?.email}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-[#EDE9FE] p-4 rounded-lg shadow-md flex ">
                        <MdMeetingRoom className="text-gray-500 w-8 h-8 mr-2" />
                        <div>
                            <h3 className="text-lg font-semibold">Total Number of Rooms</h3>
                            <p className="text-2xl  font-extrabold">{rooms}</p>
                        </div>
                    </div>
                    <div className="bg-[#D1FAE5] p-4 rounded-lg shadow-md flex">
                        <MdMeetingRoom className="text-gray-500 w-8 h-8 mr-2" />
                        <div>
                            <h3 className="text-lg font-semibold">Available Rooms</h3>
                            <p className="text-2xl  font-extrabold">{percentageAvailableRooms.toFixed(2)}%</p>
                        </div>
                    </div>
                    <div className="bg-[#D1FAE5] p-4 rounded-lg shadow-md flex ">
                        <MdMeetingRoom className="text-gray-500 w-8 h-8 mr-2" />
                        <div>
                            <h3 className="text-lg font-semibold">Unavailable Rooms</h3>
                            <p className="text-2xl font-extrabold">{percentageUnavailableRooms.toFixed(2)}%</p>
                        </div>
                    </div>
                    <div className="bg-[#FEF3C7] p-4 rounded-lg shadow-md flex ">
                        <HiOutlineUser className="text-gray-500 w-8 h-8 mr-2" />
                        <div>
                            <h3 className="text-lg font-semibold">Number of Users</h3>
                            <p className="text-2xl font-extrabold">{users}</p>
                        </div>
                    </div>
                    <div className="bg-[#FEF3C7] p-4 rounded-lg shadow-md flex">
                        <HiOutlineUser className="text-gray-500 w-8 h-8 mr-2" />
                        <div>
                            <h3 className="text-lg font-semibold">Number of Members</h3>
                            <p className="text-2xl font-extrabold">{members}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Adminprofile;
