import { useState } from 'react';
import icon from "../assets/audio.png";



const links = ['Home'
    , 'Services', 
    'Contact-Us', 
    'Docs'];

const Nav = () => {
    const [isHandBurgerClicked, setClick] = useState<boolean>(false);
    return (
        <nav className='flex h-20 bg-primary shadow-md shadow-blue-600 items-center justify-between px-10 overflow-hidden'>
            <div className="brand flex justify-center items-center">
                <img className='md:h-10 mx-3 0 h-10 relative ' src={icon} alt="white-logo" />
                <p className='md:text-2xl text-xl text-white'>Sonar
                </p>
            </div>
            <ul className={`links pt-20 md:pt-0 top-0  justify-start absolute md:static transition-all z-10 w-screen h-screen bg-primary md:h-max ${isHandBurgerClicked ? "left-0" : "left-[-100%]"} text-white flex flex-col md:flex-row  text-xl  md:w-96 md:justify-between p-3  rounded-xl `}>
                {
                    links.map((item: string,idx:number) => {
                        return <li key={idx} className={`text-center   my-2  rounded-xl ${isHandBurgerClicked?'text-blue-400':null}`}>{item}</li>
                    })
                }
            </ul>
            <i onClick={() => setClick((pre) => !pre)} className="fa-solid relative z-20 md:hidden fa-bars-staggered  text-white"></i>
        </nav>
    )
}

export default Nav
