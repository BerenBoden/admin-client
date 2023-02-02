import _ from "lodash";
import { useState, useRef } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import { Dialog, Menu } from "../../base-components/Headless";
import { Link } from "react-router-dom";
import { usePagination } from "../../stores/hooks";
import { useGetProductsQuery } from "../../stores/services/products/productsSlice";

function Main({ content }: any) {
  const [pageLimit, setPageLimit] = useState(10);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = useRef(null);
  const { page, currentPages, handlePageChange, paginationIsLoading, data } =
    usePagination(pageLimit, useGetProductsQuery, { content });

  console.log(data)
  if(paginationIsLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y">Product Grid</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Link to="new">
            <Button variant="primary" className="mr-2 shadow-md">
              Add New Product
            </Button>
          </Link>
          <Menu>
            <Menu.Button as={Button} className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                Excel
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export to
                PDF
              </Menu.Item>
            </Menu.Items>
          </Menu>
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
        {/* BEGIN: Users Layout */}
        {data.data.map(({id, attributes}: any) => (
          <div
            key={id}
            className="col-span-12 intro-y md:col-span-6 lg:col-span-4 xl:col-span-3"
          >
            <div className="box">
              <div className="p-5">
                <div className="h-40 overflow-hidden rounded-md 2xl:h-56 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                  <img
                    alt="Midone - HTML Admin Template"
                    className="rounded-md"
                    src={`${import.meta.env.VITE_STRAPI_API}${
                      attributes?.image_header.data.attributes.formats.thumbnail
                        .url
                    }`}
                  />

                  <div className="absolute bottom-0 z-10 px-5 pb-6 text-white">
                    <a href="" className="block text-base font-medium">
                      {attributes.title}
                    </a>
                    <span className="mt-3 text-xs text-white/90">
                      {/* {faker.products[0].category} */}
                    </span>
                  </div>
                </div>
                <div className="mt-5 text-slate-600 dark:text-slate-500">
                  <div className="flex items-center">
                    <Lucide icon="Link" className="w-4 h-4 mr-2" /> Price: $
                    {attributes.price}
                  </div>
                  <div className="flex items-center mt-2">
                    <Lucide icon="Layers" className="w-4 h-4 mr-2" /> Remaining
                    Stock:
                    {/* {faker.stocks[0]} */}
                  </div>
                  <div className="flex items-center mt-2">
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />{" "}
                    Status:
                    {/* {faker.trueFalse[0] ? "Active" : "Inactive"} */}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center p-5 border-t lg:justify-end border-slate-200/60 dark:border-darkmode-400">
                <a className="flex items-center mr-auto text-primary" href="#">
                  <Lucide icon="Eye" className="w-4 h-4 mr-1" /> Preview
                </a>
                <a className="flex items-center mr-3" href="#">
                  <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" /> Edit
                </a>
                <a
                  className="flex items-center text-danger"
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setDeleteConfirmationModal(true);
                  }}
                >
                  <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                </a>
              </div>
            </div>
          </div>
        ))}
        {/* END: Users Layout */}
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
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false);
        }}
        initialFocus={deleteButtonRef}
      >
        <Dialog.Panel>
          <div className="p-5 text-center">
            <Lucide
              icon="XCircle"
              className="w-16 h-16 mx-auto mt-3 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal(false);
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              type="button"
              className="w-24"
              ref={deleteButtonRef}
            >
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: Delete Confirmation Modal */}
    </>
  );
}

export default Main;