interface HomeCard{
    title: string,
    content: string,
    img: string
}

const Card = ({title, content, img} : HomeCard) => {
  return (
    <div className="rounded-lg p-2 bg-white w-1/4 border-2 border-indigo-600 shadow-2xl hover:scale-105 transition duration-150 ease-in-out">
        <div className="flex justify-center">
            <div className="font-semibold text-2xl bg-gradient-to-r from-indigo-800 to-violet-500 inline-block text-transparent bg-clip-text pt-2">{title}</div>
        </div>
        <div className="mt-4 flex justify-center"><img src={img} className="w-40 h-32"/></div>
        <div className="mt-4 text-center text-gray-600 p-4">{content}</div>
    </div>
  )
}

export default Card