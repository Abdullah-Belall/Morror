// DONE 2

import HandleMoviesPages from "@/app/Components/HandleMoviesPages";

export const generateMetadata = ({ params }) => {
  return {
    title: `Page ${params.pagenum}`,
  };
};

export default function moviePageNum({ params }) {
  let pageNum = params.pagenum;
  return <HandleMoviesPages pageNum={pageNum} />;
}
