import React, { useEffect } from "react";
import { client } from '../export'; // Ensure the path is correct based on your project structure
import { useDarkMode } from "../DarkModeContext";
import { FaStar } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Clients = () => {
    useEffect(() => {
        AOS.init({
            offset: 200,
            duration: 800,
            easing: 'ease-in-sine',
            delay: 100,
        });
    }, []);

    const { darkMode } = useDarkMode();

    return (
        <div className={`${darkMode ? 'dark bg-black' : 'light bg-transparent'}`}>
            <section id='testimonials' className='lg:w-[95%] w-full h-fit m-auto bg-cover bg-center rounded-xl flex flex-col justify-center items-start lg:px-20 px-6 py-20 gap-20'>
                <div className='flex flex-col justify-center items-start gap-4'>
                    <h1 data-aos='zoom-in' className='text-red-500 dark:text-white text-4xl'>CLIENTS</h1>
                    <h1 data-aos='zoom-in' className='text-black dark:text-white text-[30px] font-semibold leading-10'>
                        What Our Clients<br />Saying About Us
                    </h1>
                </div>

                <div id='clients-box' className='grid lg:grid-cols-3 grid-cols-1 justify-center  items-center gap-8 w-full h-auto'>
                    {client.map((item, index) => (
                        <div
                            data-aos="zoom-in"
                            data-aos-delay="200"
                            key={index}
                            className="bg-white dark:bg-gray-900 hover:bg-red-100 cursor-pointer p-12 flex flex-col justify-center items-center gap-6 rounded-xl w-full"
                        >
                            <div className="flex flex-col items-center w-full gap-4">
                                <img
                                    src={item.image}
                                    alt={`${item.name}'s feedback`}
                                    className="w-full h-[400px] transform hover:scale-110 transition-transform duration-300"
                                />
                                <div className="flex flex-col items-start gap-1">
                                    <h1 className="text-xl text-black font-semibold dark:text-white">
                                        {item.name}
                                    </h1>
                                    <h2 className="text-slate-600 dark:text-white text-xl">{item.text}</h2>
                                </div>
                            </div>
                            <p className="text-md text-justify text-slate-600 dark:text-white text-xl">
                                {item.feedback}
                            </p>
                            <div className="flex gap-2">
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Clients;











