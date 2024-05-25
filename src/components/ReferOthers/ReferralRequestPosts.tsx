import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { ReferPostState, referPostActions } from "../../store/referRequests-slice";
import ReferTable from "./ReferTable/ReferTable";
import Filters from "./Filters/Filters";

const ReferralRequestPosts = () => {
    const companyName: string = useSelector((state: RootState) => state.user.currentCompany);
    const jwtToken: string = useSelector((state: RootState) => state.user.jwtToken);
    const data: ReferPostState[] = useSelector((state: RootState) => state.referPosts);

    const [fetching, setFetching] = useState(0);
    const [arePostsNull, setArePostsNull] = useState<boolean>(false);
    // const [arePostsNull, setArePostsNull] = useState<boolean>(false);


    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/posts/getPostsByCompany/${companyName}`, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtToken
                    }
                });
                dispatch(referPostActions.setReferPostObjects(response.data));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    function clickHandler(){
        setFetching((fetching+1) / 2)
      }

    //   if(data.length == 0) setArePostsNull(true);

    return (
        <div className="w-screen">
            <div className="w-full mt-44">
                <div className="w-full text-center text-6xl h-16 font-semibold">REFER PEOPLE TO <span className="h-16 bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">{companyName.toUpperCase()}</span></div>
                <button onClick={clickHandler}>Refresh Posts</button>
                <div className="w-full flex justify-center">
                    <Filters setArePostsNull={setArePostsNull}/>
                </div>
                {arePostsNull && <div className="mt-4 mb-4 text-2xl font-seimibold text-indigo-700 w-full flex justify-center">No posts found!!</div>}
                {/* {(data.length==0) && <div className="text-2xl font-seimibold text-indigo-700">No posts found!!</div>} */}
                {!arePostsNull && <div className="w-full flex justify-center">
                    <ReferTable data={data}/>
                </div>}
                {/* Additional JSX as needed */}
            </div>
        </div>
    );
};

export default ReferralRequestPosts;