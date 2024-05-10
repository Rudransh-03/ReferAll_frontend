import tick from '../../assets/tick.png'

const FunFact = () => {
  return (
    <div className="mt-16 ml-12 mr-12 border-2 border-indigo-700 p-4 bg-indigo-200 rounded-lg">
        <div className='flex'>
            <img src={tick} className='w-8 h-8'/><span className='mt-1'>Funfact</span>
            </div>
        <div className='text-gray-700'>Referrals increase your chances of getting an interview call from a company by as much as 30%!!</div>
    </div>
  )
}

export default FunFact