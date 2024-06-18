import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";

function Announcementdetails(props) {
    const { id } = useParams()
    const axiosCommon = useAxiosCommon()
    const { data } = useQuery({
        queryKey: ["detailsId", id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/announcementdetails/${id}`);
            return data;
        }
    })




    // console.log(id)
    return (
        <div>
            <div className="relative p-4">
                <div className="max-w-3xl mx-auto">
                    <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                        <div className="">
                            <h1 className="text-gray-900 font-bold text-4xl">{data?.title}</h1>
                            <div className="py-5 text-sm font-regular text-gray-900 flex">
                                <span className="mr-3 flex flex-row items-center">
                                    <svg className="text-indigo-600" fill="currentColor" height="13px" width="13px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve">
                                        <g>
                                            <g>
                                                <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256
                      c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128
                      c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <span className="ml-1">{data?.dataTime}</span>
                                </span>
                            </div>
                            <hr />
                            <p className="text-base leading-8 my-5">
                                {data?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Announcementdetails;