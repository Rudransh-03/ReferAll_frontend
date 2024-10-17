

const Pagination = ({ postsCount, pageNumber, setPageNumber }:any) => {
    const totalPages = Math.ceil(postsCount / 5);

    function increasePageNumber(){
        setPageNumber(pageNumber+1);
    }

    function decreasePageNumber(){
        setPageNumber(pageNumber-1);
    }

    return (
        <div className="mb-12 w-full flex justify-center items-center">
            <button className={`p-2 px-4 rounded-lg text-white mx-2 ${pageNumber <= 1 ? "bg-gray-500 hover:cursor-not-allowed hover:bg-gray-600" : "bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer"}`} onClick={decreasePageNumber} disabled={pageNumber===1}>Prev</button>

            <button className={`p-2 px-4 rounded-lg text-white mx-2 ${pageNumber >= totalPages-1 ? "bg-gray-500 hover:cursor-not-allowed hover:bg-gray-600" : "bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer"}`} onClick={increasePageNumber} disabled={pageNumber===totalPages-1}>Next</button>
        </div>
    );
};

export default Pagination;
