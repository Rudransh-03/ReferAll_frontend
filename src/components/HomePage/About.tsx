import { useEffect } from "react";

const About = () => {

    useEffect(() => {
        const animatedDiv = document.getElementById('animatedDiv');

        const isInViewport = (element: HTMLElement) => {
          const rect = element.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
        };
    
        const handleScroll = () => {
          if (animatedDiv && isInViewport(animatedDiv)) {
            animatedDiv.classList.add('animate-scaleUp');
            animatedDiv.classList.remove('opacity-0');
            window.removeEventListener('scroll', handleScroll);
          }
        };
    
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);

  return (
    <div className="bg-black h-4/6">
        <div id="animatedDiv" className="flex justify-center opacity-0">
            <div className="text-6xl font-semibold text-white">
                <span>What is </span><span className="bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">ReferAll?</span>
            </div>
        </div>
        <div className="flex mt-12 text-lg text-gray-300 justify-center px-56 text-center animate-scaleUp">
            <div>
                Hello! ReferAll is all about making referral-seeking an easy and hassle-free process. You can ask for job referrals or refer someone to your company without any trouble. We've made the whole process 
                simple and quick, so you can focus on growing your career or finding great talent for your company. 
                Say goodbye to cold mailing and sending 100s of connection requests per day. Just put in a referral 
                request and let our community take care of the rest!!
            </div>
        </div>
    </div>
  )
}

export default About;
