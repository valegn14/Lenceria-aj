import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header2() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <>
<header className='bg-gradient-to-b from-[#FFFFFFs] to-[#FFFFFF] shadow-lg text-pink-900'>
<div className='container  mx-auto mt-0 px-4 py-4'>
                    <div className='flex items-center mx-auto justify-between '>
                        <Link to='/' className='flex items-center space-x-3'>
                            <svg
                                fill='yellow'
                                filter='drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))'
                                width='50px'
                                height='50px'
                                viewBox='0 0 1024 1024'
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon'>
                                <path d='M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7z' />
                            </svg>
                            <h1 className='text-2xl font-bold hover:text-black '>
                            Lenceria_aj
                            </h1>
                        </Link>
                        <nav>
                            <ul className=' hidden sm:flex space-x-6 text-xl'>
                                <li className='hover:text-[#2b01e7]'>
                                    <Link to='/table'>Productos</Link>
                                </li>
                                

                                {/* pasamos los colores en hex (paletadecolores.online)*/}
                                <li className='hover:text-[#2b01e7]'>
                                    <Link to='/Calculator'>Contactanos</Link>
                                </li>
                                <li className='hover:text-[#2b01e7]'>
                                    <Link to='/Dashboard'>Visitanos</Link>
                                </li>
                                <li >
  <Link to='/Overview'>
    <img src="src\components\layout\carrito.png" alt="Carrito" className="w-6 h-6" />
  </Link>
</li>
                            </ul>
                            <button
                                className='sm:hidden focus:outline-none'
                                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <svg
                                    className='w-10 h-10'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'>
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d={
                                            isMenuOpen
                                                ? "M6 18L18 6M6 6l12 12"
                                                : "M4 6h16M4 12h16m-7 6h7"
                                        }
                                    />
                                </svg>
                                {isMenuOpen && (
                                    <div className='sm:hidden absolute top-0 right-16 z-50 bg-gradient-to-b rounded-xl px-4 py-4'>
                                        <ul className='text-xl text-center text-white'>
                                            <li className='hover:text-[#2b01e7] hover:font-bold'>
                                                <Link to='/table'>Table</Link>
                                            </li>
                                            <li className='hover:text-[#2b01e7] hover:font-bold'>
                                                <Link to='/Overview'>
                                                    overview
                                                </Link>
                                            </li>
                                            <li className='hover:text-[#2b01e7] hover:font-bold'>
                                                <Link to='/Calculator'>
                                                    calculator
                                                </Link>
                                            </li>
                                            <li className='hover:text-[#2b01e7] hover:font-bold'>
                                                <Link to='/Dashboard'>
                                                    dashboard
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </button>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}
