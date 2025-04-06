import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";
import API from "../utils/apiConfig.js";

function ChapterList() {
  const [chapters, setChapters] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [lastChapter, setLastChapter] = useState(null);
  const [lastPage, setLastPage] = useState(null);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
  };

  useEffect(() => {
    const chapterCookie = getCookie("lastChapter");
    const pageCookie = getCookie("lastPage");
    if (chapterCookie) setLastChapter(chapterCookie);
    if (pageCookie) setLastPage(parseInt(pageCookie));

    axios.get(`${API}/api/chapters`)
      .then(res => {
        const sorted = res.data.sort((a, b) => {
          const numA = parseInt(a.match(/\d+/)?.[0]);
          const numB = parseInt(b.match(/\d+/)?.[0]);
          return numA - numB;
        });
        setChapters(sorted);

        if (sorted.length > 0) {
          axios.get(`${API}/api/chapters/${sorted[0]}`)
            .then(res => {
              setThumbnail(`${API}/manga/${sorted[0]}/${res.data[0]}`);
            });
        }
      })
      .catch(err => console.error("Error fetching chapters:", err));
  }, []);

  const total = chapters.length;
  const read = parseInt(localStorage.getItem("highestRead")) || 0;
  const left = total - read;

  return (
    <div className="bg-[#141414] text-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 shrink-0">
            {thumbnail && (
              <img src={thumbnail} alt="Cover" className="w-full rounded-lg shadow-md" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-extrabold tracking-tight mb-2">Bleach</h1>
            <p className="text-lg text-orange-300 mb-1">Tite Kubo</p>
            <div className="flex flex-wrap gap-2 text-sm text-orange-200 mt-2 mb-4">
              {["Action", "Supernatural", "Shounen", "Complete"].map(tag => (
                <span key={tag} className="bg-white/10 px-2 py-1 rounded">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-orange-300 mb-4">
              <div className="flex items-center gap-1"><Star className="w-4 h-4" /> 9.5</div>
              <div className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {total} Chapters</div>
              <div className="flex items-center gap-1">{read} Read / {left} Left</div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Bleach follows Ichigo Kurosaki, a high school student who becomes a Soul Reaper — guiding souls to the afterlife and battling evil spirits. With powerful swordsmanship and spiritual energy, he faces deadly enemies, uncovers secrets of the spirit world, and grows into a powerful warrior.
            </p>
            {lastChapter && (
              <Link
                to={`/chapter/${lastChapter}`}
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow mb-4"
              >
                📖 Continue Reading (Page {lastPage + 1})
              </Link>
            )}
          </div>
        </div>
        <div className="mt-10">
          <div className="text-xl font-bold mb-4">Chapters</div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[40vh] overflow-y-auto pr-1">
            {chapters.map((chapter, index) => (
              <li key={index}>
                <Link
                  to={`/chapter/${chapter}`}
                  className="block bg-orange-700 hover:bg-orange-600 text-center py-2 rounded text-sm font-medium"
                >
                  {chapter.replace('_', ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ChapterList;
