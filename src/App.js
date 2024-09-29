import React, { useState } from 'react';
import { marked } from 'marked';
import './App.css';
import './test.css';
import { FaBold, FaItalic, FaHeading, FaMoon, FaSun, FaLink, FaQuoteRight, FaCode, FaListOl, FaImage } from 'react-icons/fa';

function App() {
  const [markdown, setMarkdown] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  const downloadFile = (content, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = type === 'text/markdown' ? 'document.md' : 'document.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen flex flex-col md:flex-row`}>
      <div className="w-full md:w-1/2 p-4 md:p-8 bg-gray-100 dark:bg-gray-900 overflow-auto flex flex-col min-h-[510px]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Markdown Editor</h1>
          <button
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className="editor-toolbar flex gap-2 mb-4 flex-wrap justify-center">
          <button className="toolbar-btn rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 transition-colors duration-300" onClick={() => setMarkdown(markdown + '\n# Heading\n')}>
            <FaHeading className="text-lg" />
          </button>
          <button className="toolbar-btn rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 transition-colors duration-300" onClick={() => setMarkdown(markdown + ' **bold** ')}>
            <FaBold className="text-lg" />
          </button>
          <button className="toolbar-btn rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 transition-colors duration-300" onClick={() => setMarkdown(markdown + ' _italic_ ')}>
            <FaItalic className="text-lg" />
          </button>
          <button className="toolbar-btn rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 transition-colors duration-300" onClick={() => setMarkdown(markdown + '[Link Text](http://)')}>
            <FaLink className="text-lg" />
          </button>
          <button className="toolbar-btn rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 transition-colors duration-300" onClick={() => setMarkdown(markdown + '\n![Alt Text](http://image-url)\n')}>
            <FaImage className="text-lg" />
          </button>
          <button className="toolbar-btn rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 transition-colors duration-300" onClick={() => setMarkdown(markdown + '\n> Blockquote\n')}>
            <FaQuoteRight className="text-lg" />
          </button>
          <button className="toolbar-btn rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 transition-colors duration-300" onClick={() => setMarkdown(markdown + '\n```\nCode Block\n```\n')}>
            <FaCode className="text-lg" />
          </button>
          <button className="toolbar-btn rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 transition-colors duration-300" onClick={() => setMarkdown(markdown + '\n1. Ordered List Item\n')}>
            <FaListOl className="text-lg" />
          </button>
        </div>

        <textarea
          className={`markdown-input w-full h-full flex-1 p-4 border-0 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg transition-shadow duration-300`}
          value={markdown}
          onChange={handleMarkdownChange}
          placeholder="Enter your markdown here"
        />
      </div>

      <div className="w-full md:w-1/2 p-4 md:p-8 bg-gray-200 dark:bg-gray-800 overflow-auto flex flex-col">
        <div
          className={`markdown-preview w-full h-full border-0 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-lg transition-all duration-500`}
          dangerouslySetInnerHTML={{ __html: marked(markdown) }}
        />

        <div className="flex justify-end mt-4">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg mr-2 transition-colors duration-300"
            onClick={() => downloadFile(markdown, 'text/markdown')}
          >
            Download Markdown
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            onClick={() => downloadFile(marked(markdown), 'text/html')}
          >
            Download HTML
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
