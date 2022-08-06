import React from 'react'
import Jobcard from './Jobcard'
import { useState } from "react";
import FrontPaginate from './admin/FrontPaginate';

function JobList({ jobs }) {

  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = jobs && jobs.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='m-5 max-w-3xl'>
           <h1 className='bg-white dark:bg-transparent text-2xl font-bold mb-2'>5 Jobs Avalable</h1>
           <p className='mb-2'>
              Lorem ipsum dolor sit amet,consectetur adipiscing elit.Ut blandit arcu
              in pretium molestie.Interdum et malesuada fames acme.Lorem ipsum dolor
               sit amet,consectetur adipiscing elit.
            </p>
            <div className='space-y-6 pb-7 '>
                 {currentPosts.map((job) => (
                  <Jobcard key={job.id} job={job}/>
                ))}
            </div>
            <FrontPaginate postsPerPage={postsPerPage}
                        totalPosts={jobs.length}
                        paginate={paginate}/>
        </div>
  )
}

export default JobList