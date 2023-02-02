import ArticleForm from "../../components/ArticleForm";

function Main({
  content,
  identifiers,
}: {
  content: string;
  identifiers: Array<any>;
}) {
  
  return (
    <>
      <ArticleForm content={content} identifiers={identifiers} />
    </>
  );
}

export default Main;
