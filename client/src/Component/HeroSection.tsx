import  { useEffect, useState } from 'react';
import {  motion } from "framer-motion";
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0);
    const [texts] = useState<Array<string>>([
        'Friends',
        'Family',
        'Girlfriend',
        'Buddy',
    ]);
    useEffect(() => {
        const interValid = setTimeout(() => setCurrentActiveIndex((pre) => (pre + 1) % texts.length), 3000);
        return () => clearTimeout(interValid);

    }, [currentActiveIndex]);
    return (
        <div className='flex flex-col min-h-screen max-h-max bg-primary'>
            <div className='grow-1 text-white h-96 flex justify-center items-center  '>
                <p className=' text-3xl lg:text-7xl font-bold md:text-5xl text-center p-5 '>
                    <span className='bg-gradient-to-r text-transparent from-[#a17af9] via-[#fb94b5] to-[#d3a774] bg-clip-text'>
                        Ditch the texts, it's time to
                        Sonar
                        <br />
                        Call With&nbsp;
                    </span>
                    <AnimatedTexts texts={texts} currentActiveIndex={currentActiveIndex} />
                </p>

            </div>
            <div className="cards text-white flex-col items-center gap-2   flex justify-around sm:flex-row p-5">
                {/* <div className='flex flex-col  h-72 lg:h-96  border border-violet-500 opacity-[0.9]  justify-around lg:w-96 w-72  items-center rounded-xl '>
                    <i className="fa-solid fa-video md:text-5xl text-4xl lg:text-8xl"></i>
                    <p className='font-bold text-2xl'>Voice Call</p>
                    <button className=' text-blue-100 bg-gradient-to-r from-violet-600 to-indigo-600 md:py-2 md:px-5  py-1 px-2 rounded text-xl '>Start Voice  Call</button>
                </div> */}
                <div className='flex flex-col  h-72 lg:h-96 border border-violet-500   opacity-[0.9]  justify-around lg:w-96 w-72  items-center rounded-xl '>
                    <i className="fa-solid fa-ear-listen md:text-5xl text-4xl lg:text-8xl"></i>
                    <p className='font-bold text-2xl'>Voice Call</p>
                    <Link to={'/call'} className=' text-blue-100 bg-gradient-to-r  from-violet-600 to-indigo-600 md:py-2 md:px-5  py-1 px-2 rounded text-xl '>Start Voice  Call</Link>
                </div>

            </div>

        </div>
    )
}


const AnimatedTexts = ({ texts, currentActiveIndex }: { texts: Array<string>, currentActiveIndex: number }) => {

    return <motion.span
        className='overflow-hidden '
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    delay: 0.00001,
                    staggerChildren: 0.05,
                }
            }
        }}
        initial="hidden"
        animate="visible"
    >
        {texts[currentActiveIndex] && texts[currentActiveIndex].split("").map((item: string, idx: number) => {
            return <motion.span
                className='inline-block'
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                }}
                key={item + "_" + idx}
            >
                {item}
            </motion.span>
        })}
    </motion.span>

}

export default HeroSection
