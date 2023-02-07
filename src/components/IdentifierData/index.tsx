// TODO Break into smaller components.

import { useState, useRef } from "react";
import clsx from "clsx";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormInput, FormSelect } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Notification from "../../base-components/Notification";
import { Link, useHref } from "react-router-dom";
//Need to reimplment
import Tippy from "../../base-components/Tippy";
import pluralize from "pluralize";
import Table from "../../base-components/Table";
import Modal from "../../components/Modal";
import { usePagination } from "../../stores/hooks";
import { useNotification } from "../../stores/hooks";
import {
  useDeleteIdentifierMutation,
  useGetIdentifiersQuery
} from "../../stores/services/identifiers/identifiersSlice";

function Main({
  content,
  identifier,
}: {
  content: string;
  identifier: string;
}) {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [deleteName, setDeleteName] = useState("");
  const idRef = useRef(null);
  const { page, currentPages, handlePageChange, paginationIsLoading, data } = usePagination(pageLimit, useGetIdentifiersQuery, {content: content, identifier: identifier});
  
  const [
    deleteCategory,
    {
      isLoading: deleteIsLoading,
      isError: deleteIsError,
      isSuccess: deleteIsSuccess,
    },
  ] = useDeleteIdentifierMutation();

  const text = deleteIsSuccess ? `Successfully deleted ${pluralize.singular(identifier)}: "${deleteName}"` : "There was an error, please try again.";
  const { notificationProps, validIcon, notification } = useNotification(deleteIsSuccess, deleteIsError, text);

  const openModal = (id: any, name: string) => {
    idRef.current = id;
    setDeleteName(name);
    setConfirmationModal(!confirmationModal);
  };

  const handleDelete = async () => {
    setConfirmationModal(false);
    deleteCategory({ id: idRef.current, content, identifier });
  };

  if (paginationIsLoading || deleteIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="mt-10 text-lg font-medium intro-y capitalize">
        {content} {identifier}
      </h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Link to={`new`}>
            <Button variant="primary" className="mr-2 shadow-md capitalize">
              Add New {identifier}
            </Button>
          </Link>
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
        {/* BEGIN: Data List */}
        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2">
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  IMAGES
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap uppercase">
                  {identifier} NAME
                </Table.Th>
                <Table.Th className="border-b-0 whitespace-nowrap">
                  SLUG
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  STATUS
                </Table.Th>
                <Table.Th className="text-center border-b-0 whitespace-nowrap">
                  ACTIONS
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data.data.map((item: any) => (
                <>

                  <Table.Tr key={item.id} className="">
                    <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div className="flex">
                        <div className="w-10 h-10 image-fit zoom-in">
                          {/* <Tippy
                          as="img"
                          alt="Midone Tailwind HTML Admin Template"
                          className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          // src={item}
                          // content={`Uploaded at ${item}`}
                        /> */}
                        </div>
                        <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                          {/* <Tippy
                          as="img"
                          alt="Midone Tailwind HTML Admin Template"
                          className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          // src={item}
                          // content={`Uploaded at ${item}`}
                        /> */}
                        </div>
                        <div className="w-10 h-10 -ml-5 image-fit zoom-in">
                          {/* <Tippy
                          as="img"
                          alt="Midone Tailwind HTML Admin Template"
                          className="rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          // src={item.images[2]}
                          // content={`Uploaded at ${item.dates[2]}`}
                        /> */}
                        </div>
                      </div>
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <a href="" className="font-medium whitespace-nowrap">
                        {item.attributes.name}
                      </a>
                      <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                        {/* Tags: {item.categories[0].tags} */}
                      </div>
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md text-center bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <a
                        className="flex items-center mr-3 text-slate-500"
                        href={`https://firesidecandles.co.nz/${content}/${identifier}/${item.attributes.slug}`}
                        target="_blank"
                      >
                        <Lucide icon="ExternalLink" className="w-4 h-4 mr-2" />
                        firesidecandles.co.nz/{content}/{identifier}/{item.attributes.slug}
                      </a>
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]">
                      <div
                        className={clsx([
                          "flex items-center justify-center",
                          // { "text-success": faker.trueFalse[0] },
                          // { "text-danger": !faker.trueFalse[0] },
                        ])}
                      >
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                        {"Active"}
                      </div>
                    </Table.Td>
                    <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                      <div className="flex items-center justify-center">
                      <Link to={`${item.attributes.name}?=${item.id}`}>
                        <a className="flex items-center mr-3" href="">
                          <Lucide icon="CheckSquare" className="w-4 h-4 mr-1" />
                          Edit
                        </a>
                      </Link>
                        <a

                          className="flex items-center text-danger"
                          href="#"
                          onClick={() =>
                            openModal(item.id, item.attributes.name)
                          }
                        >
                          <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                          Delete
                        </a>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                </>
              ))}
            </Table.Tbody>
          </Table>
        </div>
        {/* END: Data List */}
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
      <div className="text-center">
        {/* BEGIN: Notification Content */}
        <Notification
          getRef={(el) => {
            notification.current = el;
          }}
          className="flex items-center"
        >
          <Lucide
            icon={validIcon}
            className={notificationProps.className}
          />
          <div className="ml-4 mr-4">
            <div className="font-medium">
              {notificationProps.text}
            </div>
          </div>
        </Notification>
      </div>
      {confirmationModal && (
        <Modal
          icon="XCircle"
          question={`Delete category "${deleteName}"?`}
          buttonText="Delete"
          buttonType="danger"
          information={`Are you sure you want to delete category "${deleteName}". This can not be undone.`}
          handleSubmit={handleDelete}
          confirmationModal={confirmationModal}
          setConfirmationModal={setConfirmationModal}
        />
      )}
      {/* END: Delete Confirmation Modal */}
      <div className="text-center">
        {/* BEGIN: Notification Content */}
        <Notification
          getRef={(el) => {
            notification.current = el;
          }}
          className="flex items-center"
        >
          <Lucide icon={validIcon} className={notificationProps.className} />
          <div className="ml-4 mr-4">
            <div className="font-medium">{notificationProps.text}</div>
          </div>
        </Notification>
      </div>
    </>
  );
}

export default Main;
