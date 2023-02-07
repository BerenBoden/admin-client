import _ from "lodash";
import { useState } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import { useGetIdentifiersQuery } from "../../stores/services/identifiers/identifiersSlice";
import {
  FormInput,
  FormInline,
  FormSelect,
  FormLabel,
  FormHelp,
  FormCheck,
  InputGroup,
  FormSwitch,
} from "../../base-components/Form";
import TomSelect from "../../base-components/TomSelect";
import { ClassicEditor } from "../../base-components/Ckeditor";
import Alert from "../../base-components/Alert";
import Lucide from "../../base-components/Lucide";
import Tippy from "../../base-components/Tippy";
import Table from "../../base-components/Table";
import IdentifierSelector from "../../components/IdentifierSelector";

function Main({ content, identifiers }: { content: string; identifiers: any }) {
  const [subcategory, setSubcategory] = useState([""]);
  const [editorData, setEditorData] = useState("<p>Content of the editor.</p>");
  const [productImages, setProductImages] = useState<any>([]);
  const [coverPhoto, setCoverPhoto] = useState<any>({});
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [errors, setErrors] = useState<any>({});

  const [selectedIdentifier, setSelectedIdentifier] = useState({
    categories: [""],
    tags: [""],
  });
  const [identifiersData, setIdentifiers] = useState<any>([]);

  const handleSelectedIdentifier = (identifierData: any, identifier: any) => {
    setSelectedIdentifier((prevState) => {
      return {
        ...prevState,
        [identifier]: identifierData,
      };
    });
  };

  // const { data: identifierData, isLoading } = useGetIdentifiersQuery({pageStart: false, pageLimit: false, content, identifiers});

  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.result) {
        setCoverPhoto({ base64: fileReader.result, file: file });
      }
    };
  };

  const handleProductImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;
    console.log(files);

    const images = [...productImages];
    let fileArray = Array.from(files);

    if (fileArray.length >= 5) {
      fileArray = fileArray.slice(0, 5);
    }

    fileArray.forEach((file, index) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.result) {
          images[index] = { base64: fileReader.result, file: file };
          setProductImages(images);
        }
      };
    });
  };

  const validateContent = (
    title: string,
    content: any,
    coverPhoto: any,
    product_categories: any,
    product_tags: any
  ) => {
    const errors = {
      title: !!title,
      content: !!content,
      coverPhoto: !!coverPhoto,
      product_categories: product_categories[0] !== "",
      product_tags: product_tags[0] !== "",
    };

    return errors;
  };

  const handleSubmit = () => {};

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Add Product</h2>
      </div>
      <div className="grid grid-cols-11 pb-20 mt-5 gap-x-6">
        {/* BEGIN: Notification */}
        <div className="col-span-11 intro-y 2xl:col-span-9">
          {/* BEGIN: Uplaod Product */}
          <div className="p-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Upload
                Product
              </div>
              <div className="mt-5">
                <FormInline className="flex-col items-start mt-10 xl:flex-row">
                  <FormLabel className="w-full xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Cover Photo</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        Select at least 1 photo for your product's cover photo.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full pt-4 mt-3 border-2 border-dashed rounded-md xl:mt-0 dark:border-darkmode-400">
                    <div className="flex flex-wrap items-center justify-center px-4 w-full">
                      {coverPhoto.base64 && (
                        <img
                          className="h-64"
                          src={coverPhoto.base64}
                          alt="Uploaded Image"
                        />
                      )}
                    </div>

                    <div className="relative flex items-center justify-center px-4 pb-4 mt-5 cursor-pointer">
                      <Lucide icon="Image" className="w-4 h-4 mr-2" />
                      <span className="mr-1 text-primary">
                        Upload a file
                      </span>{" "}
                      or drag and drop
                      <FormInput
                        id="horizontal-form-1"
                        onChange={handleCoverImageChange}
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0"
                      />
                    </div>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start mt-10 xl:flex-row">
                  <FormLabel className="w-full xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Photos</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        <div className="mt-2">
                          Select product photos or drag and drop up to 5 photos
                          at once here. Include min. 3 photos.
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full pt-4 mt-3 border-2 border-dashed rounded-md xl:mt-0 dark:border-darkmode-400">
                    <div className="grid grid-cols-10 gap-5 pl-4 pr-5">
                      {productImages.length >= 1 &&
                        productImages.map((image: any, index: any) => (
                          <div
                            key={index}
                            className="relative col-span-5 cursor-pointer md:col-span-2 h-28 image-fit zoom-in "
                          >
                            <img
                              className="rounded-md border-solid border-2"
                              src={image.base64}
                              alt="Product"
                            />
                          </div>
                        ))}
                    </div>
                    <div className="relative flex items-center justify-center px-4 pb-4 mt-5 cursor-pointer">
                      <Lucide icon="Image" className="w-4 h-4 mr-2" />
                      <span className="mr-1 text-primary">Upload files</span> or
                      drag and drop
                      <FormInput
                        onChange={handleProductImageChange}
                        id="horizontal-form-1"
                        multiple
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0"
                      />
                    </div>
                  </div>
                </FormInline>
              </div>
            </div>
          </div>
          {/* END: Uplaod Product */}
          {/* BEGIN: Product Information */}
          <div className="p-5 mt-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Product
                Information
              </div>
              <div className="mt-5">
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Name</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput
                      id="product-name"
                      type="text"
                      placeholder="Product name"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <FormHelp className="text-right">
                      Maximum character 0/70
                    </FormHelp>
                  </div>
                </FormInline>

                {identifiers.map((identifier: any) => {
                  return (
                    <IdentifierSelector
                      errors={errors}
                      identifier={identifier}
                      content={content}
                      handleSelectedIdentifier={handleSelectedIdentifier}
                      setIdentifiers={setIdentifiers}
                      selectedIdentifier={selectedIdentifier}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {/* END: Product Information */}
          {/* BEGIN: Product Detail */}
          <div className="p-5 mt-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Product
                Detail
              </div>
              <div className="mt-5">
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Description</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        <div>
                          Make sure the product description provides a detailed
                          explanation of your product so that it is easy to
                          understand and find your product.
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <ClassicEditor
                      value={editorData}
                      onChange={setEditorData}
                    />
                    <FormHelp className="text-right">
                      Maximum character 0/2000
                    </FormHelp>
                  </div>
                </FormInline>
              </div>
            </div>
          </div>
          {/* END: Product Detail */}

          {/* BEGIN: Product Variant (Details) */}

          {/* BEGIN: Product Management */}
          <div className="p-5 mt-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Product
                Management
              </div>
              <div className="mt-5">
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Status</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        If the status is active, your product can be searched
                        for by potential buyers.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormSwitch>
                      <FormSwitch.Input
                        id="product-status-active"
                        type="checkbox"
                      />
                      <FormSwitch.Label htmlFor="product-status-active">
                        Active
                      </FormSwitch.Label>
                    </FormSwitch>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Stock</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput
                      id="product-stock"
                      type="text"
                      placeholder="Input Product Stock"
                    />
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">
                          SKU (Stock Keeping Unit)
                        </div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        Use a unique SKU code if you want to mark your product.
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormInput id="sku" type="text" placeholder="Input SKU" />
                  </div>
                </FormInline>
              </div>
            </div>
          </div>
          {/* END: Product Management */}
          {/* BEGIN: Weight & Shipping */}
          <div className="p-5 mt-5 intro-y box">
            <div className="p-5 border rounded-md border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center pb-5 text-base font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                <Lucide icon="ChevronDown" className="w-4 h-4 mr-2" /> Weight &
                Shipping
              </div>
              <div className="mt-5">
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Weight</div>
                        <div className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md">
                          Required
                        </div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        Enter the weight by weighing the product after it
                        is&nbsp;
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                          packaged
                        </span>
                        .
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="grid-cols-4 gap-2 sm:grid">
                      <FormSelect>
                        <option value="Gram (g)">Gram (g)</option>
                        <option value="Kilogram (kg)">Kilogram (kg)</option>
                      </FormSelect>
                      <FormInput
                        type="text"
                        id="product-weight"
                        className="mt-2 sm:mt-0"
                        placeholder="100g"
                      />
                    </div>
                    <Alert
                      variant="outline-warning"
                      dismissible
                      className="mt-5 bg-warning/20 dark:bg-darkmode-400 dark:border-darkmode-400"
                    >
                      {({ dismiss }) => (
                        <>
                          <div className="flex items-center">
                            <span>
                              <Lucide
                                icon="AlertTriangle"
                                className="w-6 h-6 mr-3"
                              />
                            </span>
                            <span className="text-slate-800 dark:text-slate-500">
                              Pay close attention to the weight of the product
                              so that there is no difference in data with the
                              shipping courier.{" "}
                              <a className="font-medium text-primary" href="">
                                Learn More
                              </a>
                            </span>
                            <Alert.DismissButton
                              className="btn-close dark:text-white"
                              onClick={dismiss}
                            >
                              <Lucide icon="X" className="w-4 h-4" />
                            </Alert.DismissButton>
                          </div>
                        </>
                      )}
                    </Alert>
                  </div>
                </FormInline>
                <FormInline className="flex-col items-start pt-5 mt-5 xl:flex-row first:mt-0 first:pt-0">
                  <FormLabel className="xl:w-64 xl:!mr-10">
                    <div className="text-left">
                      <div className="flex items-center">
                        <div className="font-medium">Product Size</div>
                      </div>
                      <div className="mt-3 text-xs leading-relaxed text-slate-500">
                        Enter the product size after packing to calculate the
                        volume weight.
                        <a className="font-medium text-primary" href="">
                          Learn Volume Weight
                        </a>
                      </div>
                    </div>
                  </FormLabel>
                  <div className="flex-1 w-full mt-3 xl:mt-0">
                    <div className="grid-cols-3 gap-2 sm:grid">
                      <InputGroup>
                        <FormInput type="text" placeholder="Width" />
                        <InputGroup.Text>cm</InputGroup.Text>
                      </InputGroup>
                      <InputGroup className="mt-2 sm:mt-0">
                        <FormInput type="text" placeholder="Height" />
                        <InputGroup.Text>cm</InputGroup.Text>
                      </InputGroup>
                      <InputGroup className="mt-2 sm:mt-0">
                        <FormInput type="text" placeholder="Length" />
                        <InputGroup.Text>cm</InputGroup.Text>
                      </InputGroup>
                    </div>
                  </div>
                </FormInline>
              </div>
            </div>
          </div>
          {/* END: Weight & Shipping */}
          <div className="flex flex-col justify-end gap-2 mt-5 md:flex-row">
            <Button
              type="button"
              className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:w-52"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              className="w-full py-3 md:w-52"
            >
              Save & Pubish
            </Button>
          </div>
        </div>
        <div className="2xl:col-span-2 hidden 2xl:block">
          <div className="sticky top-0 pt-10">
            <ul className="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:dark:bg-darkmode-600 before:h-full before:absolute before:left-0 before:z-[-1]">
              <li className="pl-5 mb-4 font-medium border-l-2 border-primary dark:border-primary text-primary">
                <a href="">Upload Product</a>
              </li>
              <li className="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a href="">Product Information</a>
              </li>
              <li className="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a href="">Product Detail</a>
              </li>
              <li className="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a href="">Product Variant</a>
              </li>
              <li className="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a href="">Product Variant (Details)</a>
              </li>
              <li className="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a href="">Product Management</a>
              </li>
              <li className="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a href="">Weight & Shipping</a>
              </li>
            </ul>
            <div className="relative p-5 mt-10 border rounded-md bg-warning/20 dark:bg-darkmode-600 border-warning dark:border-0">
              <Lucide
                icon="Lightbulb"
                className="absolute top-0 right-0 w-12 h-12 mt-5 mr-3 text-warning/80"
              />
              <h2 className="text-lg font-medium">Tips</h2>
              <div className="mt-5 font-medium">Price</div>
              <div className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-500">
                <div>
                  The image format is .jpg .jpeg .png and a minimum size of 300
                  x 300 pixels (For optimal images use a minimum size of 700 x
                  700 pixels).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
