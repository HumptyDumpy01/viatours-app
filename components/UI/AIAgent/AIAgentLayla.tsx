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
  const [chatHistory, setChatHistory] = useState<LaylaCommentType[] | []>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(``);
  const [showAIWindow, setShowAIWindow] = useState<boolean>(false);
  const chatHistoryContainer = useRef<HTMLDivElement>(null);

  // Function to scroll to the bottom of the chat history container
  const scrollToBottom = () => {
    chatHistoryContainer.current?.scrollBy(0, chatHistoryContainer.current.scrollHeight);
  };
  // when the user opens the chat window, scroll to the bottom of the chat history container
  useEffect(() => {
    if (showAIWindow) {
      scrollToBottom();
    }
  }, [showAIWindow, chatHistory]);


  useEffect(() => {
    // fetch the chat history from the local storage
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


    setChatHistory((prev) => {
      if (prev) {
        return [...prev, { type: 'user', text: results.query, date: new Date().toISOString() }];
      } else {
        return [{ type: 'user', text: results.query, date: new Date().toISOString() }];
      }
    });
    // Select up to 3 previous user comments and answers from Layla AI
    // to send to the AI endpoint for better context.
    // If the chat history is empty, then send an empty array.
    const chatHistoryForAI = chatHistory ? chatHistory.slice(-8) : [];

    currObject.reset();

    /* use your FastAPI endpoint to fetch the data from AI.
    *  If the response is successful, then append the correctly formatted
    *  response to chatHistory array.
    *  If an error occurs, push a new error message to the error state. */
    const response = await fetch(`${process.env.CHATBOT_BACKEND_URL}/viatours-agent/get-response`, {
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

      setChatHistory((prev) => {
        if (prev) {
          return [...prev, { type: 'layla', text: response.response, date: response.date }];
        } else {
          return [{ type: 'layla', text: response.response, date: response.date }];
        }
      });

      /* Create an API endpoint which would save each response to the mongodb database for analysis */
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
    // smoothly scroll to the bottom of the chat history container
    // manually, as the chat history container is not a native scrollable element.
    chatHistoryContainer.current?.scrollBy(0, chatHistoryContainer.current.scrollHeight);

  }

  function handleClearChatHistory() {
    setChatHistory([]);
    localStorage.removeItem(`chatHistory`);
  }

  // push the response to the chatHistory local Storage as well,
  // so I can use it later on to display the chat history.
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
            {/*<UserComment text={`How to request a refund for tickets I bought?`} initials={'Nikolas Baker'} />*/}
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
              d="M8.32183 10.397C8.32183 10.1212 8.43142 9.85661 8.62648 9.66155C8.82155 9.46648 9.08611 9.3569 9.36197 9.3569H15.6028C15.8787 9.3569 16.1432 9.46648 16.3383 9.66155C16.5334 9.85661 16.643 10.1212 16.643 10.397C16.643 10.6729 16.5334 10.9375 16.3383 11.1325C16.1432 11.3276 15.8787 11.4372 15.6028 11.4372H9.36197C9.08611 11.4372 8.82155 11.3276 8.62648 11.1325C8.43142 10.9375 8.32183 10.6729 8.32183 10.397ZM9.36197 13.5175C9.08611 13.5175 8.82155 13.627 8.62648 13.8221C8.43142 14.0172 8.32183 14.2817 8.32183 14.5576C8.32183 14.8335 8.43142 15.098 8.62648 15.2931C8.82155 15.4881 9.08611 15.5977 9.36197 15.5977H13.5225C13.7984 15.5977 14.063 15.4881 14.258 15.2931C14.4531 15.098 14.5627 14.8335 14.5627 14.5576C14.5627 14.2817 14.4531 14.0172 14.258 13.8221C14.063 13.627 13.7984 13.5175 13.5225 13.5175H9.36197ZM0.00071825 12.4773C0.00124905 9.72936 0.908605 7.05839 2.58203 4.87874C4.25546 2.69908 6.60141 1.13259 9.25597 0.422265C11.9105 -0.288062 14.7253 -0.102516 17.2636 0.950119C19.802 2.00275 21.922 3.86364 23.2948 6.24409C24.6677 8.62455 25.2166 11.3915 24.8564 14.1158C24.4962 16.84 23.2471 19.3692 21.3027 21.3111C19.3584 23.253 16.8276 24.499 14.1029 24.8558C11.3783 25.2125 8.61197 24.6602 6.23323 23.2844L1.36954 24.907C1.18985 24.967 0.99719 24.9768 0.812348 24.9353C0.627507 24.8938 0.457505 24.8026 0.320691 24.6716C0.183877 24.5405 0.0854469 24.3746 0.0360229 24.1917C-0.0134011 24.0089 -0.0119417 23.816 0.0402437 23.6338L1.5214 18.4519C0.52291 16.6188 6.74424e-05 14.5647 0.00071825 12.4773ZM12.4824 2.07592C10.6459 2.0758 8.84208 2.56194 7.25435 3.4849C5.66662 4.40787 4.35156 5.73476 3.44285 7.3307C2.53415 8.92664 2.0642 10.7347 2.08077 12.5712C2.09734 14.4076 2.59984 16.2069 3.53719 17.7862C3.60931 17.9082 3.65574 18.0436 3.67363 18.1842C3.69151 18.3248 3.68048 18.4676 3.64121 18.6037L2.58234 22.3066L6.03145 21.1583C6.17793 21.1094 6.33346 21.0938 6.48674 21.1125C6.64003 21.1312 6.78722 21.1838 6.91765 21.2665C8.28079 22.1292 9.82591 22.663 11.4309 22.8257C13.0358 22.9884 14.6566 22.7755 16.1652 22.204C17.6737 21.6324 19.0287 20.7178 20.1229 19.5325C21.2171 18.3471 22.0206 16.9235 22.4698 15.3741C22.9191 13.8247 23.0018 12.1921 22.7115 10.6053C22.4212 9.01842 21.7657 7.52086 20.7969 6.23095C19.8282 4.94105 18.5726 3.89415 17.1296 3.17302C15.6866 2.45189 14.0956 2.0763 12.4824 2.07592Z"
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