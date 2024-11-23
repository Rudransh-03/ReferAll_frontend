import axios from "axios";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { referPostActions } from "../../../store/referRequests-slice";

const Filters = ({setArePostsNull, setShowPagination, setPageNumber} : any) => {

    const [selectedValue, setSelectedValue] = useState<string>('none');
    
    const jwtToken: string = useSelector((state: RootState) => state.user.jwtToken);
    const companyName: string = useSelector((state: RootState) => state.user.currentCompany);
    const dispatch = useDispatch();

     function handleDropdownChange(event: ChangeEvent<HTMLSelectElement>){
        let value = event.target.value;
        setSelectedValue(value);
    };

    const searchFilterRef: React.MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);


    async function submitHandler(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        var formValue = searchFilterRef.current?.value;

        setShowPagination(false);

        if(selectedValue === "none" && searchFilterRef.current!=null &&searchFilterRef.current.value.length === 0){
            setShowPagination(true);
            setPageNumber(1);
        }

        if(searchFilterRef.current!=null && searchFilterRef.current.value.length > 0 && selectedValue.length > 0){
            
            try {
                const response = await axios.get(`https://referall-backend.onrender.com/posts/getFilteredPostsByBothReferredStatusAndSearchTerm/${companyName}?referredStatus=${selectedValue}&searchTerm=${formValue}`, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtToken
                    }
                });
                if(response.data === "No posts found"){
                    setArePostsNull(true);
                }
                else{
                    setArePostsNull(false);
                    dispatch(referPostActions.setReferPostObjects(response.data));
                }
            } catch (error) {
                console.error(error);
            }
        }

        else if((searchFilterRef.current == null) || (searchFilterRef.current!=null && searchFilterRef.current.value.length == 0)){
            
            try {
                const response = await axios.get(`https://referall-backend.onrender.com/posts/getFilteredPostsByReferredStatus/${companyName}?referredStatus=${selectedValue}`, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtToken
                    }
                });
                if(response.data === "No posts found"){
                    setArePostsNull(true);
                }
                else{
                    setArePostsNull(false);
                    dispatch(referPostActions.setReferPostObjects(response.data));
                }
            } catch (error) {
                console.error(error);
            }
        }
    }


    return (
        <>
      <div className="mt-8 w-10/12 border border-indigo-700 py-4 px-2 rounded-lg bg-indigo-100 flex justify-between">
        <form onSubmit={submitHandler} className="w-full flex">
          <div className="w-4/12 flex ml-8 mr-4">
            <div className="w-1/4 flex items-center -mr-2"><label htmlFor="dropdown" className="w-full">Filter By:</label></div>
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
                <input type='text' placeholder='Search by Job Title or Job Id' className='p-2 px-4 rounded-lg border border-indigo-700 w-11/12' ref={searchFilterRef} />
            </div>
    </div>
    <button type="submit" className="py-2 px-2 -ml-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 ">Apply filter(s)</button>
    </form>
      </div>
      </>
    )
  }
  
  export default Filters