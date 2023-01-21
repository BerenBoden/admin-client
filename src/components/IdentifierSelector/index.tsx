import { useGetIdentifiersQuery } from "../../stores/services/identifiers/identifiersSlice";
import { FormInput, FormLabel, FormSwitch } from "../../base-components/Form";
import TomSelect from "../../base-components/TomSelect";
import { useState } from "react";

function Main({ identifier, content, }: {identifier: string, content: string,}) {
  const [categories, setCategories] = useState<any>([""])

  const { data, isLoading} = useGetIdentifiersQuery({pageStart: 0, pageLimit: -1, content, identifier});

  if(isLoading){
    return <div>Loading...</div>
  }
  return (
    <div className="mt-3">
      <FormLabel htmlFor="post-form-3" className="capitalize">{identifier}</FormLabel>
      <TomSelect
        id="post-form-3"
        value={categories}
        onChange={setCategories}
        className="w-full"
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