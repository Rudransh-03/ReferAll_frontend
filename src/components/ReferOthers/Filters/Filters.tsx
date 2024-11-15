import axios from "axios";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { referPostActions } from "../../../store/referRequests-slice";

const Filters = ({ setArePostsNull, setShowPagination, setPageNumber }: any) => {
    const [selectedValue, setSelectedValue] = useState<string>('none');
    const jwtToken: string = useSelector((state: RootState) => state.user.jwtToken);
    const companyName: string = useSelector((state: RootState) => state.user.currentCompany);
    const dispatch = useDispatch();
    const searchFilterRef: React.MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);

    function handleDropdownChange(event: ChangeEvent<HTMLSelectElement>) {
        let value = event.target.value;
        setSelectedValue(value);
    };

    async function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formValue = searchFilterRef.current?.value;
        setShowPagination(false);

        if (selectedValue === "none" && searchFilterRef.current?.value?.length === 0) {
            setShowPagination(true);
            setPageNumber(1);
        }

        try {
            const endpoint = selectedValue !== "none" && formValue
                ? `http://localhost:8080/posts/getFilteredPostsByBothReferredStatusAndSearchTerm/${companyName}?referredStatus=${selectedValue}&searchTerm=${formValue}`
                : `http://localhost:8080/posts/getFilteredPostsByReferredStatus/${companyName}?referredStatus=${selectedValue}`;

            const response = await axios.get(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + jwtToken
                }
            });

            if (response.data === "No posts found") {
                setArePostsNull(true);
            } else {
                setArePostsNull(false);
                dispatch(referPostActions.setReferPostObjects(response.data));
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="mt-4 w-full max-w-screen-lg mx-auto p-2 md:p-4 border border-indigo-700 rounded-lg bg-indigo-100 flex flex-col md:flex-row md:items-center md:justify-between">
            <form onSubmit={submitHandler} className="w-full flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0">
                
                <div className="w-full md:w-4/12 flex flex-col md:flex-row items-center md:ml-4 md:mr-4 mb-2 md:mb-0">
                    <label htmlFor="dropdown" className="text-sm md:text-base md:w-1/4 mb-1 md:mb-0 md:mr-2 text-center md:text-left">Filter By:</label>
                    <select
                        className="text-gray-700 block w-full md:w-3/4 px-3 py-1 md:px-4 md:py-2 border border-indigo-700 rounded-md shadow-sm focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-400 focus:ring-opacity-50 text-sm md:text-base"
                        id="dropdown"
                        value={selectedValue}
                        onChange={handleDropdownChange}
                    >
                        <option value="none">None</option>
                        <option value="unreferred">Unreferred</option>
                        <option value="in progress">In Progress</option>
                        <option value="referred">Referred</option>
                    </select>
                </div>

                <div className="w-full md:w-6/12 flex flex-col md:flex-row items-center md:px-4 mb-2 md:mb-0">
                    <label className="text-sm md:text-base md:w-1/4 mb-1 md:mb-0 md:mr-2 text-center md:text-left">Search By:</label>
                    <input
                        type="text"
                        placeholder="Search by Job Title or Job ID"
                        className="p-1 px-3 md:p-2 md:px-4 rounded-lg border border-indigo-700 w-full md:w-3/4 text-sm md:text-base"
                        ref={searchFilterRef}
                    />
                </div>

                <button
                    type="submit"
                    className="py-1 px-2 md:py-2 md:px-4 w-full md:w-auto bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm md:text-base"
                >
                    Apply filter(s)
                </button>
            </form>
        </div>
    );
};

export default Filters;
