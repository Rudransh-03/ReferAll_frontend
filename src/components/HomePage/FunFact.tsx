import { useEffect, useState } from 'react';
import tick from '../../assets/tick.png';

const funFacts = [
  "Referrals increase your chances of getting an interview call from a company by as much as 40%!!",
  "Networking can open doors that your resume alone cannot.",
  "Many companies offer referral bonuses, rewarding employees for successful referrals.",
  "Candidates referred by employees are often hired faster than those who apply through traditional channels."
];

const FunFact = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isSlidingOut, setIsSlidingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSlidingOut(true);
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setNextIndex((nextIndex + 1) % funFacts.length);
        setIsSlidingOut(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [nextIndex]);

  return (
    <div className="mt-16 ml-12 mr-12 border-2 border-indigo-700 p-4 bg-indigo-800 text-white rounded-lg">
      <div className="flex items-center">
        <img src={tick} className="w-8 h-8 mt-1" alt="tick" />
        <span className="mt-1 ml-2 text-xl font-semibold">Fun Fact(s)</span>
      </div>
      <div className="relative overflow-hidden h-12 md:h-8 mt-2">
        <div className={`absolute transition-transform duration-1000 transform ${isSlidingOut ? 'translate-x-[-100%]' : 'translate-x-[2%]'}`}>
          <div className="h-8">{funFacts[currentIndex]}</div>
        </div>
      </div>
    </div>
  );
}

export default FunFact;
