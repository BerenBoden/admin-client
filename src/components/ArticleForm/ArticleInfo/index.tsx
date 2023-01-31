import { FormLabel, FormSwitch } from "../../../base-components/Form";
import Litepicker from "../../../base-components/Litepicker";
import { Menu } from "../../../base-components/Headless";
import IdentifierSelector from "../../../components/IdentifierSelector";
import Button from "../../../base-components/Button";
import Lucide from "../../../base-components/Lucide";

function Main({errors, author, setAuthor, usersData, salesReportFilter, setSalesReportFilter, identifiers, handleSelectedIdentifier, content, setIdentifiers, selectedIdentifier }: any) {
    return (
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
                  src="#"
                />
              </div>
              <div className="truncate">{author}</div>
              <Lucide icon="ChevronDown" className="w-4 h-4 ml-auto" />
            </Menu.Button>
            <Menu.Items>
              {usersData &&
                usersData.map((user: any) => (
                  <Menu.Item
                    key={user.id}
                    onClick={() => setAuthor(user.username)}
                  >
                    <div className="absolute w-6 h-6 mr-3 image-fit">
                      <img
                        className="rounded"
                        alt="Midone Tailwind HTML Admin Template"
                        src="#"
                      />
                    </div>
                    <div className="pl-1 ml-8">{user.username}</div>
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
  );
}

export default Main;
