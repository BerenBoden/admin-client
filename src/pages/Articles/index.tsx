import { useState } from "react";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import { Menu } from "../../base-components/Headless";
import { NavLink } from "react-router-dom";
import { useGetArticlesQuery } from "../../stores/services/articles/articlesSlice";
import { usePagination } from "../../stores/hooks";
import { Link } from 'react-router-dom'

function Main({ content }: any) {
  const [pageLimit, setPageLimit] = useState(10);
  const { page, currentPages, handlePageChange, paginationIsLoading, data } =
    usePagination(pageLimit, useGetArticlesQuery, { content });

  if (paginationIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-wrap items-center col-span-12 mt-8 intro-y sm:flex-nowrap">
        <NavLink to="new">
          <Button variant="primary" className="mr-2 shadow-md">
            Add New Article
          </Button>
        </NavLink>
        <div className="hidden mx-auto md:block text-slate-500">
          Showing 1 to {pageLimit} of {data.meta.pagination.total} entries
        </div>
        <div className="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0">
          <div className="relative w-56 text-slate-500">
            <FormInput
              type="text"
              className="w-56 pr-10 !box"
              placeholder="Search..."
            />
            <Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5 intro-y">
        {/* BEGIN: Blog Layout */}
        {data.data.map(({ id, attributes }: any, i: number) => (
          <div
            key={id}
            className="col-span-12 intro-y md:col-span-6 xl:col-span-4 box"
          >
            <div className="flex items-center px-5 py-4 border-b border-slate-200/60 dark:border-darkmode-400">
              <div className="flex-none w-10 h-10 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src="#"
                />
              </div>
              <div className="ml-3 mr-auto">
                <a href="" className="font-medium">
                  {attributes?.author}
                </a>
                <div className="flex text-slate-500 truncate text-xs mt-0.5">
                  <a className="inline-block truncate text-primary" href="">
                    {attributes.title}
                  </a>
                  <span className="mx-1"></span> 
                </div>
              </div>
              <Menu className="ml-3">
                <Menu.Button
                  tag="a"
                  href="#"
                  className="w-5 h-5 text-slate-500"
                >
                  <Lucide icon="MoreVertical" className="w-5 h-5" />
                </Menu.Button>
                <Menu.Items className="w-40">
                  <Link to={`${attributes.title}?id=${id}`}>
                    <Menu.Item>
                      <Lucide icon="Edit2" className="w-4 h-4 mr-2" /> Edit Post
                    </Menu.Item>
                  </Link>
                  <Menu.Item>
                    <Lucide icon="Trash" className="w-4 h-4 mr-2" /> Delete Post
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
            <div className="p-5">
              <div className="h-40 2xl:h-56 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-md"
                  src={`${import.meta.env.VITE_STRAPI_API}${
                    attributes.image_header.data.attributes.formats.thumbnail
                      .url
                  }`}
                />
              </div>
              <a href="" className="block mt-5 text-base font-medium">
                {attributes.title}
              </a>
              <div className="mt-2 text-slate-600 dark:text-slate-500">
                {attributes.title}
              </div>
            </div>
            <div className="flex items-center px-5 py-3 border-t border-slate-200/60 dark:border-darkmode-400">
              <Tippy
                as="a"
                href=""
                className="flex items-center justify-center w-8 h-8 mr-2 border rounded-full intro-x border-slate-300 dark:border-darkmode-400 dark:bg-darkmode-300 dark:text-slate-300 text-slate-500"
                content="Bookmark"
              >
                <Lucide icon="Bookmark" className="w-3 h-3" />
              </Tippy>
              <div className="flex mr-2 intro-x">
                <div className="w-8 h-8 intro-x image-fit">
                  {/* <Tippy
                    as="img"
                    alt="Midone Tailwind HTML Admin Template"
                    className="border border-white rounded-full zoom-in"
                    src="#"
                  /> */}
                </div>
                <div className="w-8 h-8 -ml-4 intro-x image-fit">
                  {/* <Tippy
                    as="img"
                    alt="Midone Tailwind HTML Admin Template"
                    className="border border-white rounded-full zoom-in"
                    src="#"
                    
                  /> */}
                </div>
                <div className="w-8 h-8 -ml-4 intro-x image-fit">
                  {/* <Tippy
                    as="img"
                    alt="Midone Tailwind HTML Admin Template"
                    className="border border-white rounded-full zoom-in"
                    src="#"
                  /> */}
                </div>
              </div>
              <Tippy
                as="a"
                href=""
                className="flex items-center justify-center w-8 h-8 ml-auto rounded-full intro-x text-primary bg-primary/10 dark:bg-darkmode-300 dark:text-slate-300"
                content="Share"
              >
                <Lucide icon="Share2" className="w-3 h-3" />
              </Tippy>
              <Tippy
                as="a"
                href=""
                className="flex items-center justify-center w-8 h-8 ml-2 text-white rounded-full intro-x bg-primary"
                content="Download PDF"
              >
                <Lucide icon="Share" className="w-3 h-3" />
              </Tippy>
            </div>
            <div className="px-5 pt-3 pb-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <div className="flex w-full text-xs text-slate-500 sm:text-sm">
                <div className="mr-2">
                  Comments: <span className="font-medium">0</span>
                </div>
                <div className="mr-2">
                  Views: <span className="font-medium">0</span>
                </div>
                <div className="ml-auto">
                  Likes: <span className="font-medium">0</span>
                </div>
              </div>
              <div className="flex items-center w-full mt-3">
                <div className="flex-none w-8 h-8 mr-3 image-fit">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    className="rounded-full"
                    src="#"
                  />
                </div>
                <div className="relative flex-1 text-slate-600">
                  <FormInput
                    rounded
                    type="text"
                    className="pr-10 border-transparent bg-slate-100"
                    placeholder="Post a comment..."
                  />
                  <Lucide
                    icon="Smile"
                    className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* END: Blog Layout */}
        {/* BEGIN: Pagination */}
        {/* BEGIN: Pagination */}
        <div className="flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap">
          <Pagination className="w-full sm:w-auto sm:mr-auto">
            <Pagination.Link handleClick={() => handlePageChange(page - 1)}>
              <Lucide icon="ChevronsLeft" className="w-4 h-4" />
            </Pagination.Link>
            {currentPages.map((pageNumber) => (
              <Pagination.Link
                key={pageNumber}
                className={
                  page === pageNumber
                    ? "!box font-medium dark:bg-darkmode-400"
                    : ""
                }
              >
                {pageNumber}
              </Pagination.Link>
            ))}
            <Pagination.Link handleClick={() => handlePageChange(page + 1)}>
              <Lucide icon="ChevronsRight" className="w-4 h-4" />
            </Pagination.Link>
          </Pagination>

          <FormSelect
            className="w-20 mt-3 !box sm:mt-0"
            value={pageLimit}
            onChange={(event) => setPageLimit(Number(event.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={35}>35</option>
            <option value={50}>50</option>
          </FormSelect>
        </div>
        {/* END: Pagination */}
        {/* END: Pagination */}
      </div>
    </>
  );
}

export default Main;
