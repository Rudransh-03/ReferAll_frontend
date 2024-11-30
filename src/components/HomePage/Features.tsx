import { useEffect } from "react";
import Card from "../../utils/Card";
import handshake from '../../assets/handshake.jpeg';
import getReferred from '../../assets/getReferred.jpg';
import points from '../../assets/points.jpg';

const Features = () => {
  useEffect(() => {
    const animatedText = document.getElementById('animatedText');

    const isInViewport = (element:any) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    const handleScroll = () => {
      if (animatedText && isInViewport(animatedText)) {
        animatedText.classList.add('animate-scaleUp');
        animatedText.classList.remove('opacity-0');
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-black text-white">
      <div id="animatedText" className="mt-20 text-5xl md:text-6xl font-semibold opacity-0">
  <div className="flex flex-col md:flex-row justify-center text-center">
    <p>How does it&nbsp;</p>
    <span className="bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text">
      work?
    </span>
  </div>
</div>


      {/* Card Container */}
      <div className="flex flex-col lg:flex-row justify-around items-center w-full lg:items-stretch lg:space-x-8 mt-16 space-y-8 lg:space-y-0">
        <Card
          title={"Refer Others"}
          img={handshake}
          content={"Discover and refer promising candidates by thoroughly reviewing their resumes. Dive into their qualifications, experience, and skills to identify the best fits for referral. Utilize our platform's user-friendly interface to seamlessly recommend these candidates to relevant opportunities. Leverage your insights and expertise to match talent with the right roles, earning points and recognition along the way. Start exploring resumes and referring candidates today for a rewarding networking experience!"}
        />
        <Card
          title={"Get Referred"}
          img={getReferred}
          content={"Requesting a referral is as easy as filling out a straightforward form and waiting for someone to recommend you. Simply provide your details and let our platform connect you with potential referrals. It's a hassle-free process that puts your networking needs at the forefront. Sit back, relax, and let your profile speak for itself as others refer you to exciting opportunities. Start now and unlock the power of effortless networking!"}
        />
        <Card
          title={"Earn Points"}
          img={points}
          content={"Earn 2 points for every successful referral that you give and 1 point when someone refers you. Accumulate these points to enhance your profile visibility. Profiles with higher points rank first, increasing your chances of receiving referrals. So why wait? Start referring every qualified candidate today and boost your networking prowess!"}
        />
      </div>
    </div>
  );
};

export default Features;
