import { useEffect, useState } from "react";
import axios from "axios";
import API from "../utils/apiConfig";

function useChapters() {
  const [chapters, setChapters] = useState([]);

  // Fetch and sort chapter list on mount
  useEffect(() => {
    axios.get(`${API}/api/chapters`).then((res) => {
      const sorted = res.data.sort((a, b) => {
        const numA = parseFloat(a.replace(/[^\d.]/g, ""));
        const numB = parseFloat(b.replace(/[^\d.]/g, ""));
        return numA - numB;
      });
      setChapters(sorted);
    });
  }, []);

  return chapters;
}

export default useChapters;
