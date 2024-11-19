import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { ReferPostState, referPostActions } from "../../store/referRequests-slice";
import ReferTable from "./ReferTable/ReferTable";
import Filters from "./Filters/Filters";
import Pagination from "../Pagination";

const ReferralRequestPosts = () => {
    const companyName: string = useSelector((state: RootState) => state.user.currentCompany);
    const jwtToken: string = useSelector((state: RootState) => state.user.jwtToken);
    const data: ReferPostState[] = useSelector((state: RootState) => state.referPosts);

    const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state for posts
    const [isCountLoading, setIsCountLoading] = useState<boolean>(true); // Loading state for posts count
    const [arePostsNull, setArePostsNull] = useState<boolean>(false);
    const [postsCount, setPostsCount] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [showPagination, setShowPagination] = useState<boolean>(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading posts
            try {
                const response = await axios.get(
                    `http://localhost:8080/posts/getPaginatedPostsByCompany/${companyName}?pageNumber=${pageNumber}`,
                    {
                        headers: {
                            Authorization: "Bearer " + jwtToken,
                        },
                    }
                );
                dispatch(referPostActions.setReferPostObjects(response.data));
                setArePostsNull(response.data.length === 0);
            } catch (error) {
                console.error(error);
                setArePostsNull(true);
            } finally {
                setIsLoading(false); // Stop loading posts
            }
        };

        fetchData();
    }, [pageNumber]);

    useEffect(() => {
        const fetchTotalPostsCount = async () => {
            setIsCountLoading(true); // Start loading posts count
            try {
                const response = await axios.get(
                    `http://localhost:8080/posts/getTotalPostsCountByCompany/${companyName}`,
                    {
                        headers: {
                            Authorization: "Bearer " + jwtToken,
                        },
                    }
                );
                setPostsCount(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsCountLoading(false); // Stop loading posts count
            }
        };

        fetchTotalPostsCount();
    }, []);

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            {isLoading || isCountLoading ? (
                <div className="text-indigo-700 text-xl md:text-2xl font-semibold animate-fade-in-out">
                    Loading data...
                </div>
            ) : (
                <div className="w-full -mt-48">
                    <div className="w-full text-center text-4xl md:text-5xl md:mb-8 mb-4 md:mb-0 md:text-5xl h-16 font-semibold">
                        REFER PEOPLE TO{" "}
                        <span className="h-16 bg-gradient-to-r from-indigo-700 to-violet-500 inline-block text-transparent bg-clip-text">
                            {companyName.toUpperCase()}
                        </span>
                    </div>
                    <div className="md:mx-12 mx-8 flex justify-center">
                        <Filters
                            setArePostsNull={setArePostsNull}
                            setShowPagination={setShowPagination}
                            setPageNumber={setPageNumber}
                        />
                    </div>
                    {arePostsNull ? (
                        <div className="mt-4 mb-4 text-2xl font-semibold text-indigo-700 w-full flex justify-center">
                            No posts found!!
                        </div>
                    ) : (
                        <div className="w-full flex justify-center">
                            <ReferTable data={data} />
                        </div>
                    )}
                    {!arePostsNull && showPagination && (
                        <div className="w-full flex justify-center">
                            <Pagination
                                postsCount={postsCount}
                                pageNumber={pageNumber}
                                setPageNumber={setPageNumber}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReferralRequestPosts;
