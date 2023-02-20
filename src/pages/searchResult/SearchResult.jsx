// for search
// we get :query from url


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// using the infinit scroll
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {

  // INSTANCE
  const [data, setData] = useState(null);
  // getting query from url
  const { query } = useParams();



  // STATES
  // Pagination
  // by default from tdmb api we get only 20 results so, we have to increase page:pagination for more results
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);

  //METHODS

  // for initial 20 results
  // loading is done before every new 20 results are fetched
  const fetchInitialData =()=>{
    setLoading(true);
    // initially pageNum is 1
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
        (res) => {
      // setting the data with response
      setData(res);
      // increasing page num by using previous page num
      setPageNum((prev)=>prev+1);
      setLoading(false);
    })
  }


  // Merging the data with previous page
  // calling new 20 results
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
        (res) => {
            if (data?.results) {
                setData({
                    // ... data means old data
                    ...data,
                    // Making array of data with old and new data
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        }
    );
};


// USEEFFECT
useEffect(() => {
    // setPageNum is not imp but may lead to error sometime if not done
    setPageNum(1);
    fetchInitialData();
}, [query]);

  
  return (
    <div className="searchResultsPage">
    {loading && <Spinner initial={true} />}
    {!loading && (
        <ContentWrapper>
            {data?.results?.length > 0 ? (
                <>
                    <div className="pageTitle">

                      {/* search results of 'anything' */}
                        {`Search ${
                            data?.total_results > 1
                                ? "results"
                                : "result"
                        } of '${query}'`}
                    </div>

                    {/* INFINITE SCROLL */}
                    <InfiniteScroll
                        className="content"

                        // initial datalength is emplty so we added or []
                        dataLength={data?.results?.length || []}

                        // next data to fetched
                        next={fetchNextPageData}

                        // infinit scroll continue only to point of total pages from api data
                        hasMore={pageNum <= data?.total_pages}

                        // spinner or loader
                        loader={<Spinner />}
                    >
                        {data?.results.map((item, index) => {
                          
                          // in tdmb api we also get person from serach but we dont want to show person so,
                            if (item.media_type === "person") return;
                            return (
                                <MovieCard
                                    key={index}
                                    data={item}
                                    fromSearch={true}
                                />
                            );
                        })}
                    </InfiniteScroll>
                </>
            ) : (
                <span className="resultNotFound">
                    Sorry, Results not found!
                </span>
            )}
        </ContentWrapper>
    )}
</div>
  )
}

export default SearchResult