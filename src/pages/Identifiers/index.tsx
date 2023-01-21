import IdentifierData from '../../components/IdentifierData'

function Main({content, identifiers}: {content: string, identifiers: Array<any>}) {
  return (
    <>
      {
        identifiers.map((identifier: any, index: number) => {
          return <IdentifierData key={index} content={content} identifier={identifier} />
        })
      }    
    </>
  );
}

export default Main;
