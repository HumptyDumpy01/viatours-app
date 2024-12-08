'use client';

import { motion } from 'framer-motion';
import classes from '@/components/UI/AIAgent/AIAgentLayla.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import LaylaComment from '@/components/UI/AIAgent/LaylaComment';
import UserComment from '@/components/UI/AIAgent/UserComment';

export type LaylaResponseType = {
  response: string;
  status: number;
  query: string;
  date: string;
}

type LaylaCommentType = {
  type: 'user' | 'layla';
  text: string;
  date: string;
}

export function formatTheDate(date: string) {
  const dateVal = new Date(date);
  const month = dateVal.toLocaleString('default', { month: 'long' });
  const day = dateVal.getDate();
  const hours = dateVal.getHours();
  const minutes = dateVal.getMinutes();
  const formattedDate = `${month} ${day}, ${hours}:${minutes}`;
  return formattedDate;
}

export default function AIAgentLayla() {
  const [chatHistory, setChatHistory] = useState<LaylaCommentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(``);
  const [showAIWindow, setShowAIWindow] = useState<boolean>(false);
  const chatHistoryContainer = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatHistoryContainer.current?.scrollBy(0, chatHistoryContainer.current.scrollHeight);
  };

  useEffect(() => {
    if (showAIWindow) {
      scrollToBottom();
    }
  }, [showAIWindow, chatHistory]);

  useEffect(() => {
    const chatHistoryFromLocalStorage = localStorage.getItem(`chatHistory`);
    if (chatHistoryFromLocalStorage) {
      try {
        setChatHistory(JSON.parse(chatHistoryFromLocalStorage));
      } catch (e) {
        console.error('Failed to parse chat history from local storage:', e);
      }
    }
  }, []);

  function toggleShowAIWindow(state: boolean) {
    setShowAIWindow(state);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setError(``);
    setLoading(true);

    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { query: string };
    if (!results || results.query.trim() === ``) {
      setError(`Please enter a valid query!`);
      setLoading(false);
      return;
    }
    if (results.query.length > 500) {
      setError(`Please enter a query with less than 500 characters!`);
      setLoading(false);
      return;
    }

    const newUserComment: LaylaCommentType = { type: 'user', text: results.query, date: new Date().toISOString() };
    setChatHistory((prev) => [...prev, newUserComment]);

    const chatHistoryForAI = chatHistory ? chatHistory.slice(-8) : [];

    chatHistoryForAI.push({ type: `user`, text: results.query, date: new Date().toISOString() });

    currObject.reset();

    const response = await fetch(`http://localhost:8000/viatours-agent/get-response`, {
      method: `POST`,
      headers: {
        'Content-Type': `application/json`
      },
      body: JSON.stringify({ query: results.query, chatHistory: chatHistoryForAI })
    }).then((response) => response.json()
    ).then(async (res) => {
      return res;
    }).catch((error) => {
      console.error(`Fetch error:`, error);
      setError(`An error occurred while fetching the response.`);
      setLoading(false);
    });

    if (response.response) {
      setLoading(false);
      setError(``);

      const newLaylaComment: LaylaCommentType = { type: 'layla', text: response.response, date: response.date };
      setChatHistory((prev) => [...prev, newLaylaComment]);

      await fetch(`api/store-ai-response-to-database`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({ response: response })
      }).then((response) => response.json()).catch((error) => {
        console.error(`Fetch error:`, error);
      });
    }

    chatHistoryContainer.current?.scrollBy(0, chatHistoryContainer.current.scrollHeight);
  }

  function handleClearChatHistory() {
    setChatHistory([]);
    localStorage.removeItem(`chatHistory`);
  }

  if (chatHistory && error === ``)
    localStorage.setItem(`chatHistory`, JSON.stringify(chatHistory));

  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${month} ${day}, ${hours}:${minutes}`;

  return (
    <>
      {showAIWindow && (
        <div
          onClick={() => toggleShowAIWindow(false)}
          className={`${classes['ai-backdrop']} ${showAIWindow ? classes['open'] : ''}`}></div>
      )}

      <div
        className={`${classes[`ai-box`]} ${showAIWindow ? `${classes[`open`]}` : ``}`}>
        <div ref={chatHistoryContainer} className={`${classes[`ai-box-comment-container`]}`}>
          <div>
            <LaylaComment date={formattedDate} style={'message'} initialText />
          </div>
          <div>
            {chatHistory && chatHistory.length > 0 && chatHistory.map((comment, index) => {
              if (comment.type === 'user') {
                return <UserComment date={formatTheDate(comment.date)} key={index} text={comment.text}
                                    initials={'You'} />;
              } else {
                return <LaylaComment style={'message'} key={index} text={comment.text}
                                     date={formatTheDate(comment.date)} />;
              }
            })}
            {error && <LaylaComment date={formatTheDate(date.toISOString())} style={'error'} text={error} />}
            {loading && <LaylaComment date={formatTheDate(date.toISOString())} style={'loading'} />}
          </div>
        </div>
        <form onSubmit={handleSubmit} className={`${classes[`ai-input-container`]}`}>
          <input maxLength={500} disabled={loading} name={`query`} type="text" className={`${classes[`ai-input`]}`}
                 placeholder={`Your message goes here! Ask her anything!`} required />
          <div className={`${classes[`ai-input-btn-container`]}`}>
            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                disabled={loading} type={'submit'}
                className={`${classes[`ai-input-btn-submit`]} cursor-pointer ${loading ? `${classes[`btn-disabled`]}` : ''}`}>Ask
              </motion.button>
            </div>
            <div className={`${classes[`ai-input-btn-aside-container`]}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                onClick={handleClearChatHistory} disabled={loading || chatHistory?.length === 0} type={'button'}
                className={`${classes[`ai-input-btn-clear`]} cursor-pointer`}>Clear Chat
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                onClick={() => toggleShowAIWindow(false)} type={'button'}
                className={`${classes[`ai-input-btn-hide`]} cursor-pointer`}>Hide
              </motion.button>
            </div>
          </div>
        </form>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={() => toggleShowAIWindow(true)}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        className={`${classes['layla-ai-btn']} ${classes['layla-ai-btn-container']}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 25 26" fill="none">
          <g clipPath="url(#clip0_1076_5257)">
            <path
              d="984 15.5977 14.063 15.4881 14.258 15.2931C14.4531 15.098 14.5627 1"
              fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_1076_5257">
              <rect width="24.9641" height="26.0035" fill="white" transform="translate(0 -0.00195312)" />
            </clipPath>
          </defs>
        </svg>
        <p>Chat with Layla AI</p>
      </motion.button>
    </>
  );
}