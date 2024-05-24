import { ChangeEvent, FormEvent, useRef, useState } from "react";

const Filters = () => {

    const [selectedValue, setSelectedValue] = useState<string>('none');

    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        let value = event.target.value;
        if(value === "In Progress") value = "InProgress";
        setSelectedValue(value);
    };

    const searchFilterRef: React.MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);


    function submitHandler(event: FormEvent<HTMLFormElement>) : void{
        event.preventDefault();
        if(searchFilterRef.current!=null) console.log(searchFilterRef.current.value);
        if(selectedValue.length > 0) console.log(selectedValue);
    }


    return (
      <div className="mt-8 w-10/12 border border-indigo-700 py-4 px-2 rounded-lg bg-indigo-100 flex justify-between">
        <form onSubmit={submitHandler} className="w-full flex">
          <div className="w-4/12 flex ml-8 mr-4">
            <div className="w-1/4 flex items-center -mr-2"><label htmlFor="dropdown" className="w-full">Sort By:</label></div>
            <select className="mt-2 text-gray-700 block appearance-none w-full px-4 py-2 pr-10 leading-tight border border-indigo-700 rounded-md shadow-sm focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
        id="dropdown" value={selectedValue} onChange={handleDropdownChange}>
                <option value="none">None</option>
                <option value="unreferred" className="bg-black hover:bg-blue-500">Unreferred</option>
                <option value="in progress" className="bg-black hover:bg-blue-500">In Progress</option>
                <option value="referred" className="bg-black hover:bg-blue-500">Referred</option>
            </select>
        </div>
          
        <div className='w-6/12 ml-8 px-2 flex'>
        <div className='flex items-center w-1/4 ml-8 mr-2'>
        Search By:
        </div>
            <div className='-ml-8 flex items-end w-full'>
                <input type='text' placeholder='Search by Job Title, Job Id or Candidate First Name' className='p-2 px-4 rounded-lg border border-indigo-700 w-11/12' ref={searchFilterRef} />
            </div>
    </div>
    <button type="submit" className="py-2 px-2 -ml-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 ">Apply filters</button>
    </form>
      </div>
    )
  }
  
  export default Filters