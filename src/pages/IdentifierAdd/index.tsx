import TomSelect from "../../base-components/TomSelect";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../base-components/Button";
import { FormInput, FormLabel, FormTextarea } from "../../base-components/Form";
import pluralize from "pluralize";
import { slugify } from "../.././utils/helper";
import {
  useAddIdentifierMutation,
  useGetIdentifierByIdQuery,
  useUpdateIdentifierMutation,
} from "../../stores/services/identifiers/identifiersSlice";
import { useGetArticlesQuery } from "../../stores/services/articles/articlesSlice";
import { useGetProductsQuery } from "../../stores/services/products/productsSlice";
import Lucide from "../../base-components/Lucide";
import Notification from "../../base-components/Notification";
import { useNotification } from "../../stores/hooks";
import { mapObjectToId } from "../../utils/helper";
import { useGetIdentifierNameAndId } from "../../stores/hooks";

function Main({ content, identifier }: any) {
  const [name, setName] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState([""]);
  const [meta_description, setMetaDescription] = useState("");
  const [
    addIdentifier,
    {
      isLoading: addedIsLoading,
      isSuccess: addedIsSuccess,
      isError: addedIsError,
    },
  ] = useAddIdentifierMutation();
  const [
    updateIdentifier,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
    },
  ] = useUpdateIdentifierMutation();

  const funcMap: any = {
    article: useGetArticlesQuery,
    product: useGetProductsQuery,
  };

  const funcToUse: any = funcMap[content];
  const { data, isLoading: relatedDataIsLoading } = funcToUse({
    pageStart: 0,
    pageLimit: -1,
  });

  const { identifierName, identifierId } = useGetIdentifierNameAndId();
  const { data: identifierData, isLoading: identifierDataIsLoading } =
    useGetIdentifierByIdQuery({ id: identifierId, content, identifier });
  // console.log()
  if (!loaded && identifierData) {
    setName(identifierData.data.attributes.name);
    console.log(identifierData.data)
    setCategories(
      identifierData.data.attributes[`category_${pluralize(content)}`].data.map(
        ({ id }: any) => id
      )
    );
    setMetaDescription(identifierData.data.attributes.meta_description)
    setLoaded(true);
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!identifierId) {
      addIdentifier({
        name,
        content,
        identifier,
        meta_description,
        slug: slugify(name),
        related: mapObjectToId(categories),
      });
      setMetaDescription("")
      setName("");
      setCategories([""]);
      return;
    }
    console.log(slugify(name))
    updateIdentifier({
      id: identifierId,
      name,
      content,
      identifier,
      meta_description,
      slug: slugify(name),
      related: mapObjectToId(categories),
    });
  };

  const addedText = addedIsSuccess ? "Successfully added" : "Error adding";
  const updatedText = updateIsSuccess
    ? "Successfully updated"
    : "Error updating";
  const result = identifierId ? updatedText : addedText;

  const { notificationProps, validIcon, notification } = useNotification(
    addedIsSuccess || updateIsSuccess,
    addedIsError || updateIsError,
    result
  );

  if (addedIsLoading || relatedDataIsLoading || updateIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium capitalize">
          add {content} {pluralize.singular(identifier)}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          <div className="p-5 intro-y box">
            <div>
              <FormLabel htmlFor="crud-form-1" className="capitalize">
                {pluralize.singular(identifier)} name:
              </FormLabel>
              <FormInput
                id="crud-form-1"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                placeholder="Input text"
              />
            </div>
            <div>
              <FormLabel htmlFor="crud-form-1" className="capitalize mt-3">
                Meta description:
              </FormLabel>
              <FormTextarea
                id="crud-form-1"
                value={meta_description}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="w-full"
                placeholder="Input text"
              />
            </div>
            <div className="mt-3">
              <FormLabel htmlFor="crud-form-2" className="capitalize">
                Related {content}s:
              </FormLabel>
              <TomSelect
                id="crud-form-2"
                value={categories}
                onChange={setCategories}
                className="w-full"
                multiple
              >
                {data.data.map(({ id, attributes }: any) => {
                  return (
                    <option key={id} value={id}>
                      {attributes.title}
                    </option>
                  );
                })}
              </TomSelect>
            </div>
            <div className="mt-5 text-right">
              <Link to={`/${content}-${identifier}`}>
                <Button
                  type="button"
                  variant="outline-secondary"
                  className="w-24 mr-1"
                >
                  Cancel
                </Button>
              </Link>
              <Button type="submit" variant="primary" className="w-24">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Link to={`/${content}-${identifier}`}>
        <Button type="button" variant="primary" className="w-24 mt-4">
          Go Back
        </Button>
      </Link>
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
