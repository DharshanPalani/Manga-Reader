import { useEffect, useState } from "react";
import axios from "axios";
import API from "../utils/apiConfig";

function useChapterPages(chapter) {
  const [pages, setPages] = useState([]);

  // Fetch pages for the given chapter when it changes
  useEffect(() => {
    axios.get(`${API}/api/chapters/${chapter}`).then((res) => {
      setPages(res.data);
    });
  }, [chapter]);

  return pages;
}

export default useChapterPages;
