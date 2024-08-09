// 'use client';

/*type GithubBtnType = {
  // children: ReactNode;
}*/

import { signIn } from 'next-auth/react';

export default function GithubBtn(/*{  }: GithubBtnType*/) {

  function handleClick() {
    signIn('github');
  }

  return (
    <>
      <button onClick={handleClick} type={`button`} className="btn btn--sign-in-with-github">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 38 38" fill="none">
          <path
            d="M18.9998 3.16675C16.9206 3.16675 14.8617 3.57629 12.9407 4.37199C11.0197 5.16769 9.27424 6.33396 7.80398 7.80422C4.83465 10.7735 3.1665 14.8008 3.1665 19.0001C3.1665 25.9984 7.71067 31.9359 13.9965 34.0417C14.7882 34.1684 15.0415 33.6776 15.0415 33.2501V30.5742C10.6557 31.5242 9.7215 28.4526 9.7215 28.4526C8.99317 26.6159 7.964 26.1251 7.964 26.1251C6.52317 25.1434 8.07484 25.1751 8.07484 25.1751C9.65817 25.2859 10.4973 26.8059 10.4973 26.8059C11.8748 29.2126 14.2023 28.5001 15.1048 28.1201C15.2473 27.0909 15.659 26.3942 16.1023 25.9984C12.5873 25.6026 8.89817 24.2409 8.89817 18.2084C8.89817 16.4509 9.49984 15.0417 10.529 13.9176C10.3707 13.5217 9.8165 11.8751 10.6873 9.73758C10.6873 9.73758 12.0173 9.31008 15.0415 11.3526C16.2923 11.0042 17.654 10.8301 18.9998 10.8301C20.3457 10.8301 21.7073 11.0042 22.9582 11.3526C25.9823 9.31008 27.3123 9.73758 27.3123 9.73758C28.1832 11.8751 27.629 13.5217 27.4707 13.9176C28.4998 15.0417 29.1015 16.4509 29.1015 18.2084C29.1015 24.2567 25.3965 25.5867 21.8657 25.9826C22.4357 26.4734 22.9582 27.4392 22.9582 28.9117V33.2501C22.9582 33.6776 23.2115 34.1842 24.019 34.0417C30.3048 31.9201 34.8332 25.9984 34.8332 19.0001C34.8332 16.9208 34.4236 14.8619 33.6279 12.9409C32.8322 11.0199 31.666 9.27448 30.1957 7.80422C28.7254 6.33396 26.98 5.16769 25.059 4.37199C23.138 3.57629 21.0791 3.16675 18.9998 3.16675Z"
            fill="white" />
        </svg>
        Github
      </button>
    </>
  );
}
