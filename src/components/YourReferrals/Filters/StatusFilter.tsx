import { ChangeEvent, useState } from "react";

const StatusFilter = () => {

    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        console.log(value);

        if(value!=null && selectedValue.length > 0){
            
        }

    };

    return (
        <div className="w-4/12 flex mx-8">
            <div className="w-1/4 flex items-center"><label htmlFor="dropdown" className="w-full">Sort By:</label></div>
            <select className="mt-2 text-gray-700 block appearance-none w-full px-4 py-2 pr-10 leading-tight border border-indigo-700 rounded-md shadow-sm focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
        id="dropdown" value={selectedValue} onChange={handleDropdownChange}>
                <option value="none">None</option>
                <option value="unreferred" className="bg-black hover:bg-blue-500">Unreferred</option>
                <option value="in progress" className="bg-black hover:bg-blue-500">In Progress</option>
                <option value="referred" className="bg-black hover:bg-blue-500">Referred</option>
            </select>
        </div>
    )
}

export default StatusFilter