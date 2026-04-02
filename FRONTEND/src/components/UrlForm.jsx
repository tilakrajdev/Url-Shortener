import React, { useState } from "react";
import axios from "axios";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const UrlForm = () => {
  const [url, seturl] = useState("https://www.google.com");
  const [shortUrl, setShortUrl] = useState("https://www.google.com");
  const [copied, setCopied] = useState(false);
  // const queryClient = useQueryClient

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await axios.post("/api/create", { url });
    setShortUrl(data);
  };

  // For Fetching the data
  // const query = useQuery({queryKey: ['todos'], queryFn:handleSubmit})

  // For posting the data
  // const mutation = useMutation({
  //   mutationFn: handleSubmit,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({queryKey: ['todos']})
  //   }
  // })

  const handleCopy = (e) => {
    e.preventDefault();
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="url" className="block text-sm font-medium">
          Enter your URL
        </label>
        <input
          type="url"
          value={url}
          onInput={(event) => seturl(event.target.value)}
          id="url"
          placeholder="https://example.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Shorten URL
      </button>

      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Your shortened URL:</h2>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={shortUrl}
              className="flex-1 p-2 border border-gray-300 rounded-l-md bg-gray -50"
            />
            <button
              type="button"
              onClick={handleCopy}
              className={`px-4 py-2 rounded-r-md transition-colors duration-200 
                ${copied ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default UrlForm;
