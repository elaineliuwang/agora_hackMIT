import { GetServerSideProps, NextPage } from "next";
import React, { useState } from 'react';
import axios from "axios";
import fs from 'fs';
import 'tailwindcss/tailwind.css'; // Import the Tailwind CSS styles


import path from "path";
import Link from "next/link";


// import { myFunction } from '../emotion_analysis.js';

interface Props {
  dirs: string[];
}

const Home: NextPage<Props> = ({ dirs }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [output, setOutput] = useState<string | null>(null); // Specify the type as string or null


  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/audio", formData);
      console.log(data);
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

  const handleClick = async () => {
    try {
      const response = await fetch('/api/executePython'); // Adjust the URL to match your API route
      const outputText = await response.text(); // Use response.text() to get plain text
      setOutput(outputText);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-4x">
      <nav className="flex sm:justify-center">
          <img className="flex items-center h-100 w-250 my-8" width="250" height="100" src="/logo.png"/>
      </nav>

      <label className="flex sm:justify-center w-1/6 mt-8 mb-4 mx-auto">
        <input
          type="file"
          hidden
          onChange={({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setSelectedAudio(URL.createObjectURL(file));
              setSelectedFile(file);
            }
          }}
        />
        <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer transition-transform transform duration-300 hover:scale-95">
          {selectedAudio ? (
            <img src={selectedAudio} alt="" />
          ) : (
            <span>begin recording!</span>
          )}
        </div>
      </label>
      <div className="flex sm:justify-center">
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{ opacity: uploading ? ".5" : "1" }}
          className="upload p-1 w-32 cursor-pointer rounded hover:opacity-50 transition-opacity duration-300 border-2 text-center text-black "
        >
          {uploading ? "uploading.." : "upload"}
        </button>

      </div>

      <div className="mt-20 flex flex-col space-y-3">
        {dirs.map((item) => (
          <Link key={item} href={"/audios/" + item}/>
        ))}
      </div>

      <div className="flex sm:justify-center">
        <button 
          onClick={handleClick}
          className="runagora p-3 w-32 rounded-full transition-transform transform duration-300 hover:scale-105 text-center text-black"
        >run agora</button>
      </div>

      <div className="bubble text-black text-center text-3xl italic p-3 mx-96 py-4 my-12 rounded-lg relative">
        <h1>{output} <br /></h1>
        <div className="bubble w-12 h-8 absolute bottom-0 left-4 transform rotate-45">
        </div>
      </div>


    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const props = { dirs: [] };
  try {
    const dirs = await fs.readdir(path.join(process.cwd(), "/public/audios"));
    props.dirs = dirs as any;
    return { props };
  } catch (error) {
    return { props };
  }
};

export default Home;