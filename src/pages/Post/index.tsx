import _ from "lodash";
import clsx from "clsx";
import React, { useEffect, useState, ChangeEvent } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import { FormInput, FormLabel, FormSwitch } from "../../base-components/Form";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import Litepicker from "../../base-components/Litepicker";
import TomSelect from "../../base-components/TomSelect";
import { ClassicEditor } from "../../base-components/Ckeditor";
import { Menu, Tab } from "../../base-components/Headless";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { reset } from "../../stores/auth/authSlice";
import { mapObjectToId, slugify } from "../../utils/helper";
import jwtinterceptor from "../../utils/refreshToken";
import { Cookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getTagsAndCategories } from '../../utils/api'

function Main() {
  const cookies = new Cookies();
  const [categories, setCategories] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [title, setTitle] = useState<any>("");
  const [salesReportFilter, setSalesReportFilter] = useState<string>();
  const [editorData, setEditorData] = useState("");
  const [image, setImage] = useState();
  const [imageHeader, setImageHeader] = useState<any>();
  const { user, message } = useAppSelector((state: any) => state.auth);


  const { data: categoriesData } = useQuery(["categories"], () => getTagsAndCategories('blog', 'categories'))
  const { data: tagsData  } = useQuery(["tags"], () => getTagsAndCategories('blog', 'tags'));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof user === "object" && Object.keys(user).length === 0) {
      navigate("/login");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, message, dispatch]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImageHeader(event.target.files[0]);
      const file: Blob = new Blob([event.target.files[0]], {
        type: event.target.files[0].type,
      });
      if (file) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          setImage(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleContentSubmit = async (event: React.UIEvent) => {
    try {
      event.preventDefault();
      const data = {
        title,
        content: editorData,
        slug: slugify(title),
        blog_categories: mapObjectToId(categories),
        blog_tags: mapObjectToId(tags),
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (imageHeader) {
        formData.append("files.image_header", imageHeader);
      }
      jwtinterceptor.post(
        `${import.meta.env.VITE_STRAPI_API}/api/blogs`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">Add New Post</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Menu>
            <Menu.Button
              as={Button}
              type="submit"
              variant="primary"
              className="flex items-center shadow-md"
            >
              Save <Lucide icon="ChevronDown" className="w-8 h-4 ml-2" />
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item onClick={handleContentSubmit}>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Save &
                Publish
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Save as
                Draft
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5 mt-5 intro-y">
        {/* BEGIN: Post Content */}
        <div className="col-span-12 intro-y lg:col-span-8">
          <FormInput
            type="text"
            className="px-4 py-3 pr-10 intro-y !box"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Tab.Group className="mt-5 overflow-hidden intro-y box">
            <Tab.List className="flex-col border-transparent dark:border-transparent sm:flex-row bg-slate-200 dark:bg-darkmode-800">
              <Tab fullWidth={false}>
                {({ selected }) => (
                  <Tab.Button
                    className={clsx([
                      "flex items-center justify-center w-full px-0 py-0 sm:w-40 text-slate-500",
                      !selected &&
                        "hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300",
                      selected &&
                        "text-primary border-transparent dark:bg-darkmode-600 dark:border-x-transparent dark:border-t-transparent dark:text-white",
                    ])}
                    as="button"
                  >
                    <Tippy
                      content="Fill in the article content"
                      className="flex items-center justify-center w-full py-4"
                      aria-controls="content"
                      aria-selected="true"
                    >
                      <Lucide icon="FileText" className="w-4 h-4 mr-2" />{" "}
                      Content
                    </Tippy>
                  </Tab.Button>
                )}
              </Tab>
              <Tab fullWidth={false}>
                {({ selected }) => (
                  <Tab.Button
                    className={clsx([
                      "flex items-center justify-center w-full px-0 py-0 sm:w-40 text-slate-500",
                      !selected &&
                        "hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300",
                      selected &&
                        "text-primary border-transparent dark:bg-darkmode-600 dark:border-x-transparent dark:border-t-transparent dark:text-white",
                    ])}
                    as="button"
                  >
                    <Tippy
                      content="Adjust the meta title"
                      className="flex items-center justify-center w-full py-4"
                      aria-selected="false"
                    >
                      <Lucide icon="Code" className="w-4 h-4 mr-2" /> Meta Title
                    </Tippy>
                  </Tab.Button>
                )}
              </Tab>
              <Tab fullWidth={false}>
                {({ selected }) => (
                  <Tab.Button
                    className={clsx([
                      "flex items-center justify-center w-full px-0 py-0 sm:w-40 text-slate-500",
                      !selected &&
                        "hover:border-transparent hover:bg-transparent hover:text-slate-600 hover:dark:bg-transparent hover:dark:text-slate-300",
                      selected &&
                        "text-primary border-transparent dark:bg-darkmode-600 dark:border-x-transparent dark:border-t-transparent dark:text-white",
                    ])}
                    as="button"
                  >
                    <Tippy
                      content="Use search keywords"
                      className="flex items-center justify-center w-full py-4"
                      aria-selected="false"
                    >
                      <Lucide icon="AlignLeft" className="w-4 h-4 mr-2" />{" "}
                      Keywords
                    </Tippy>
                  </Tab.Button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="p-5">
                <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                  <div className="flex items-center pb-5 font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                    <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Text
                    Content
                  </div>
                  <div className="mt-5">
                    <ClassicEditor
                      value={editorData}
                      onChange={setEditorData}
                    />
                  </div>
                </div>
                <div className="p-5 mt-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
                  <div className="flex items-center pb-5 font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                    <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" />{" "}
                    Caption & Images
                  </div>
                  <div className="mt-5">
                    <div>
                      <FormLabel htmlFor="post-form-7">Caption</FormLabel>
                      <FormInput
                        id="post-form-7"
                        type="text"
                        placeholder="Write caption"
                      />
                    </div>
                    <div className="mt-3">
                      <FormLabel>Upload Image</FormLabel>
                      <div className="pt-4 border-2 border-dashed rounded-md dark:border-darkmode-400">
                        <div className="flex flex-wrap px-4">
                          {image && <img src={image} alt="Uploaded Image" />}
                        </div>
                        <div className="relative flex items-center px-4 pb-4 cursor-pointer">
                          <Lucide icon="Image" className="w-4 h-4 mr-2" />
                          <span className="mr-1 text-primary">
                            Upload a file
                          </span>{" "}
                          or drag and drop
                          <FormInput
                            onChange={handleImageChange}
                            type="file"
                            className="absolute top-0 left-0 w-full h-full opacity-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
        {/* END: Post Content */}
        {/* BEGIN: Post Info */}
        <div className="col-span-12 lg:col-span-4">
          <div className="p-5 intro-y box">
            <div>
              <FormLabel>Written By</FormLabel>
              <Menu className="[&>div:nth-child(2)]:w-full">
                <Menu.Button
                  as={Button}
                  variant="outline-secondary"
                  className="flex items-center justify-start w-full dark:bg-darkmode-800 dark:border-darkmode-800"
                  role="button"
                >
                  <div className="w-6 h-6 mr-3 image-fit">
                    <img
                      className="rounded"
                      alt="Midone Tailwind HTML Admin Template"
                      src={fakerData[0].photos[0]}
                    />
                  </div>
                  <div className="truncate">{fakerData[0].users[0].name}</div>
                  <Lucide icon="ChevronDown" className="w-4 h-4 ml-auto" />
                </Menu.Button>
                <Menu.Items>
                  {_.take(fakerData, 5).map((faker, fakerKey) => (
                    <Menu.Item key={fakerKey}>
                      <div className="absolute w-6 h-6 mr-3 image-fit">
                        <img
                          className="rounded"
                          alt="Midone Tailwind HTML Admin Template"
                          src={faker.photos[0]}
                        />
                      </div>
                      <div className="pl-1 ml-8">{faker.users[0].name}</div>
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            </div>
            <div className="mt-3">
              <FormLabel htmlFor="post-form-2">Post Date</FormLabel>
              <Litepicker
                value={salesReportFilter}
                onChange={setSalesReportFilter}
                options={{
                  autoApply: false,
                  showWeekNumbers: true,
                  dropdowns: {
                    minYear: 1990,
                    maxYear: null,
                    months: true,
                    years: true,
                  },
                }}
              />
            </div>
            <div className="mt-3">
              <FormLabel htmlFor="post-form-3">Categories</FormLabel>
              <TomSelect
                id="post-form-3"
                value={categories}
                onChange={setCategories}
                className="w-full"
                multiple
              >
                {categoriesData && categoriesData.data.map((el: any) => (
                  <option value={el.id}>
                    {el.attributes.name}
                  </option>
                ))}
              </TomSelect>
            </div>
            <div className="mt-3">
              <FormLabel htmlFor="post-form-4">Tags</FormLabel>
              <TomSelect
                id="post-form-4"
                value={tags}
                onChange={setTags}
                className="w-full"
                multiple
              >
                {tagsData && tagsData.data.map((el: any) => (
                  <option value={el.id}>
                    {el.attributes.name}
                  </option>
                ))}
              </TomSelect>
            </div>
            <FormSwitch className="flex flex-col items-start mt-3">
              <FormSwitch.Label htmlFor="post-form-5" className="mb-2 ml-0">
                Published
              </FormSwitch.Label>
              <FormSwitch.Input id="post-form-5" type="checkbox" />
            </FormSwitch>
            <FormSwitch className="flex flex-col items-start mt-3">
              <FormSwitch.Label htmlFor="post-form-6" className="mb-2 ml-0">
                Show Author Name
              </FormSwitch.Label>
              <FormSwitch.Input id="post-form-6" type="checkbox" />
            </FormSwitch>
          </div>
        </div>
        {/* END: Post Info */}
      </div>
    </>
  );
}

export default Main;
