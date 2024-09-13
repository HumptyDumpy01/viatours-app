'use client';

import { Skeleton } from '@mui/material';
import classes from '@/components/UI/AIAgent/AIAgentLayla.module.scss';

type LaylaCommentType = {
  text?: string;
  initialText?: boolean;
  style: 'message' | 'error' | 'loading';
  date: string;
  // children: ReactNode;
}

export default function LaylaComment({ text, initialText, style, date }: LaylaCommentType) {

  if (text && initialText) {
    console.error(`Incorrect usage of LaylaComment component. Please provide either text or initialText prop.`);
    return;
  }

  return (
    <div className={`${classes[`ai-box-comment-box-container`]}`}>
      <div className={`${classes[`ai-box-comment-box`]}`}>
        <div className={`${classes[`ai-box-comment-box-logo`]}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 24 19" fill="none">
            <path
              d="M15.1069 3.33679C15.1164 3.54252 15.1006 3.74865 15.0597 3.9505C15.0184 4.16111 14.955 4.36681 14.8708 4.56422L14.5876 5.08351L14.2099 5.5556L13.7378 5.93327L13.1713 6.21651L12.6048 6.40533H11.3773L10.7637 6.21651L10.2444 5.93327L9.77228 5.5556L9.34742 5.08351L9.06417 4.56422L8.87529 3.9505C8.87529 3.76167 8.82812 3.57283 8.82812 3.33679C8.82812 3.10075 8.87529 2.95912 8.87529 2.77028C8.87529 2.58145 9.01695 2.34541 9.06417 2.15657L9.34742 1.63727L9.77228 1.16519C9.90772 1.01414 10.0673 0.886532 10.2444 0.787519L10.7637 0.504265L11.3773 0.31543H12.6048L13.1713 0.504265L13.7378 0.787519L14.2099 1.16519L14.5876 1.63727L14.8708 2.15657C14.9614 2.35159 15.0249 2.55807 15.0597 2.77028C15.0986 2.95646 15.1145 3.14673 15.1069 3.33679Z"
              fill="#EB662B" />
            <path
              d="M23.9354 4.13867C23.1806 4.18417 22.4348 4.32698 21.7166 4.56355C20.9863 4.7685 20.2755 5.03704 19.5922 5.3661C18.9023 5.66175 18.2522 6.04235 17.6566 6.49908C17.0486 6.91908 16.4798 7.39306 15.9571 7.91538C15.4305 8.46395 14.9415 9.04747 14.4936 9.6621C14.071 10.2799 13.6925 10.9267 13.3606 11.5976C13.0521 12.2896 12.7841 12.9989 12.5581 13.7221C12.3711 14.4522 12.2292 15.1932 12.1332 15.9409C12.0832 15.1866 11.9405 14.4414 11.7083 13.7221C11.5034 12.9918 11.2348 12.281 10.9058 11.5976C10.6101 10.9078 10.2295 10.2576 9.77279 9.6621C9.34124 9.04812 8.86803 8.46448 8.35649 7.91538C7.80739 7.40384 7.22375 6.93064 6.60977 6.49908C6.01426 6.04235 5.36405 5.66175 4.67422 5.3661C3.99756 5.02174 3.28517 4.75261 2.54983 4.56355C1.83161 4.32698 1.08583 4.18417 0.33102 4.13867C0.33102 4.56355 0.283811 4.98843 0.283811 5.41331C0.265578 6.28491 0.34475 7.15578 0.519855 8.00976C0.607809 8.44013 0.718112 8.86558 0.850316 9.2844C0.949449 9.70707 1.09183 10.1184 1.27519 10.5119C1.42842 10.9137 1.60173 11.3076 1.79449 11.6921L2.45541 12.8251L3.25796 13.8637L4.10772 14.8078L5.05189 15.7048L6.09049 16.4602C6.46817 16.7434 6.84581 16.9322 7.22351 17.1683L8.40371 17.7348L9.58391 18.1597L10.8586 18.4901L12.1332 18.679L13.4078 18.4901L14.6825 18.1597L15.9099 17.7348L17.0901 17.1683L18.1759 16.4602L19.2145 15.7048C19.5517 15.4304 19.8673 15.1305 20.1587 14.8078C20.4814 14.5165 20.7812 14.2009 21.0557 13.8637L21.811 12.8251C22.047 12.4474 22.2831 12.0697 22.4719 11.6921L23.0384 10.5119L23.4633 9.2844C23.5802 8.86487 23.6747 8.43936 23.7465 8.00976C23.8326 7.58863 23.8956 7.16312 23.9354 6.73512C23.9991 6.29758 24.0149 5.85433 23.9826 5.41331C23.9904 4.98788 23.9746 4.56235 23.9354 4.13867Z"
              fill="url(#paint0_linear_1069_9843)" />
            <defs>
              <linearGradient id="paint0_linear_1069_9843" x1="4.13536" y1="6.31962" x2="14.0903" y2="21.1822"
                              gradientUnits="userSpaceOnUse">
                <stop stopColor="#EB662B" />
                <stop offset="1" stopColor="#F28555" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className={`${classes[`ai-box-comment-box-initials-container`]}`}>
          <div className={`${classes[`ai-box-comment-box-name-ai`]}`}>
            <p>Layla</p>
          </div>
          <p className={`${classes[`ai-box-comment-box-time`]}`}>
            {style === `loading` ? <>
              <Skeleton variant="text" width={`10rem`} />
            </> : date}
          </p>
        </div>

      </div>
      <div className={`${classes[`ai-box-comment-text`]}`}>
        {initialText && (
          <p>Welcome, human! I am <span className={`inline-block ${classes[`ai-box-comment-text-highlight`]}`}>Viatours Layla AI Agent!</span> How
            can
            I be of your assistance?</p>
        )}
        {!initialText && text && (
          <p className={`${style === `error` ? classes[`error`] : ``}`}>{text}</p>
        )}
        {style === `loading` && (
          <>
            <div className={`${classes[`ai-box-comment-text-loading`]}`}>
              <Skeleton variant="text" width={`100%`} />
              <Skeleton variant="text" width={`80%`} />
              <Skeleton variant="text" width={`50%`} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
