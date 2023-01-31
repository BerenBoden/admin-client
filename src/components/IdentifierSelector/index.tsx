import { useGetIdentifiersQuery } from "../../stores/services/identifiers/identifiersSlice";
import { FormLabel} from "../../base-components/Form";
import TomSelect from "../../base-components/TomSelect";
import pluralize from "pluralize";

function Main({
  errors,
  identifier,
  content,
  handleSelectedIdentifier,
  setIdentifiers,
  selectedIdentifier
}: {
  errors: any;
  identifier: string;
  content: string;
  handleSelectedIdentifier: any;
  setIdentifiers: any;
  selectedIdentifier: any;
}) {


  const { data, isLoading } = useGetIdentifiersQuery({
    pageStart: 0,
    pageLimit: -1,
    content,
    identifier,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-3">
      <FormLabel htmlFor="post-form-3" className={`${errors[`article_${identifier}`] === false ? "text-red-500" : `capitalize`}`}>
        {errors[`article_${identifier}`] === false ? `Please select at least one ${pluralize.singular(identifier)}` : `${identifier}`}
      </FormLabel>
      <TomSelect
        id="post-form-3"
        value={selectedIdentifier[identifier]}
        onChange={(value) => {
          setIdentifiers(value);
          handleSelectedIdentifier(value, identifier);
        }
      } 
        className={`w-full ${errors[`article_${identifier}`] === false && "border-red-500"}`}
        multiple
      >
        {data &&
          data.data.map((el: any) => (
            <option value={el.id}>{el.attributes.name}</option>
          ))}
      </TomSelect>
    </div>
  );
}

export default Main;
