// import ArticleContent from '../../components/ArticleForm/ArticleContent'
// import ArticleInfo from '../../components/ArticleForm/ArticleInfo'
import ArticleForm from "../../components/ArticleForm";
import { useGetIdentifierNameAndId } from "../../stores/hooks";

function Main({
  content,
  identifiers,
}: {
  content: string;
  identifiers: Array<any>;
}) {
  

  return (
    <>
      {/* BEGIN: Post Content */}
      {/* <ArticleContent title={title} setTitle={setTitle} editorData={editorData} setEditorData={setEditorData} image={image} handleImageChange={handleImageChange}/> */}
      {/* END: Post Content */}
      {/* BEGIN: Post Info */}
      {/* <ArticleInfo author={author} setAuthor={setAuthor} usersData={usersData} salesReportFilter={salesReportFilter} setSalesReportFilter={setSalesReportFilter} identifiers={identifiers} handleSelectedIdentifier={handleSelectedIdentifier} content={content}/> */}
      {/* END: Post Info */}
      <ArticleForm content={content} identifiers={identifiers} />
    </>
  );
}

export default Main;
