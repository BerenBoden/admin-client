import { useState, ChangeEvent } from "react";
import Button from "../../base-components/Button";
import Lucide from "../../base-components/Lucide";
import { Menu } from "../../base-components/Headless";
import { useAppSelector } from "../../stores/hooks";
import { mapObjectToId, slugify } from "../../utils/helper";
import { useGetUsersQuery } from "../../stores/services/users/usersSlice";
import {
  useAddArticleMutation,
  useGetArticleByIdQuery,
  useUpdateArticleMutation
} from "../../stores/services/articles/articlesSlice";
import { useNotification } from "../../stores/hooks";
import ArticleInfo from "./ArticleInfo";
import ArticleContent from "./ArticleContent";
import Notification from "../../base-components/Notification";
import { useGetIdentifierNameAndId } from "../../stores/hooks";

function Main({ content, identifiers }: any) {
  const { user } = useAppSelector((state: any) => state.auth);

  const [selectedIdentifier, setSelectedIdentifier] = useState({
    categories: [""],
    tags: [""],
  });
  const [identifiersData, setIdentifiers] = useState<any>([])

  const handleSelectedIdentifier = (identifierData: any, identifier: any) => {
    console.log(identifierData, identifier)
    setSelectedIdentifier((prevState) => {
      return {
        ...prevState,
        [identifier]: identifierData,
      };
    });
  };

  const { identifierName, identifierId } = useGetIdentifierNameAndId();
  const {data, isLoading} = useGetArticleByIdQuery({id: identifierId});

  const [loaded, setLoaded] = useState<any>(null);
  const [title, setTitle] = useState<any>("");
  const [salesReportFilter, setSalesReportFilter] = useState<string>();
  const [author, setAuthor] = useState(user.username);
  const [editorData, setEditorData] = useState("");
  const [image, setImage] = useState<any>();
  const [imageHeader, setImageHeader] = useState<any>();


  const [addArticle, { isLoading: addArticleIsLoading, isSuccess, isError }] =
    useAddArticleMutation();
    
  const [updateArticle, { isLoading: updateArticleIsLoading, isSuccess: updateIsSuccess, isError: updateIsError }] = useUpdateArticleMutation();

  const { data: usersData, isLoading: getUsersIsLoading } =
    useGetUsersQuery("Users");

  const text = isSuccess ? "Successfully added" : "Error adding";
  const { notificationProps, validIcon, notification } = useNotification(
    isSuccess,
    isError,
    text
  );

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
        author,
        slug: slugify(title),
        blog_categories: mapObjectToId(selectedIdentifier.categories),
        blog_tags: mapObjectToId(selectedIdentifier.tags),
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("image_header", imageHeader);
      formData.append("Content-Type", "multipart/form-data");
      if(!identifierId){
        addArticle(formData);
        return;
      }
      updateArticle({formData, id: identifierId});
    } catch (err) {
      console.log(err);
    }
  };  
  
  if (addArticleIsLoading) {
    return <div>Loading...</div>;
  }

  if (!loaded && data) {
    setTitle(data.data.attributes.title);
    setAuthor(data.data.attributes.author);
    setEditorData(data.data.attributes.content);
    setImage(`${import.meta.env.VITE_STRAPI_API}${data.data.attributes.image_header.data.attributes.formats.thumbnail.url}`);
    handleSelectedIdentifier(data.data.attributes.article_tags.data.map(({id}: any) => `${id}`), 'tags');  
    handleSelectedIdentifier(data.data.attributes.article_categories.data.map(({id}: any) => `${id}`), 'categories'); 
    setLoaded(true);
  }
  
  return (
    <>
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">Add New Article</h2>
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
        <ArticleContent
          title={title}
          setTitle={setTitle}
          editorData={editorData}
          setEditorData={setEditorData}
          image={image}
          handleImageChange={handleImageChange}
        />
        {/* END: Post Content */}
        {/* BEGIN: Post Info */}
        <ArticleInfo
          author={author}
          setAuthor={setAuthor}
          usersData={usersData}
          salesReportFilter={salesReportFilter}
          setSalesReportFilter={setSalesReportFilter}
          identifiers={identifiers}
          selectedIdentifier={selectedIdentifier}
          setIdentifiers={setIdentifiers}
          handleSelectedIdentifier={handleSelectedIdentifier}
          content={content}
        />
        {/* END: Post Info */}
      </div>
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
