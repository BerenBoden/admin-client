import clsx from "clsx";
import { FormInput, FormLabel } from "../../../base-components/Form";
import { ClassicEditor } from "../../../base-components/Ckeditor";
import { Tab } from "../../../base-components/Headless";
import Tippy from "../../../base-components/Tippy";
import Lucide from "../../../base-components/Lucide";

function Main({title, setTitle, editorData, setEditorData, image, handleImageChange}: any) {
  return (
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
                  <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Content
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
                  <Lucide icon="AlignLeft" className="w-4 h-4 mr-2" /> Keywords
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
                <ClassicEditor value={editorData} onChange={setEditorData} />
              </div>
            </div>
            <div className="p-5 mt-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Caption &
                Images
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
  );
}

export default Main;
