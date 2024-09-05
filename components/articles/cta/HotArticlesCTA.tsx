'use client';

import LadyImage from '@/assets/images/articles/cta/a-front-view-young-lady-in-white.png';
import BrushImg from '@/assets/images/articles/cta/Brush.png';

import './HotArticlesCTA.scss';
import { FormEvent, useRef, useState, useTransition } from 'react';
/*type HotArticlesCTAType = {
  // children: ReactNode;
}*/

export default function HotArticlesCTA(/*{  }: HotArticlesCTAType*/) {

  const [error, setError] = useState<string>(``);
  const [success, setSuccess] = useState<string>(``);
  const [isPending, startTransition] = useTransition();
  const timer = useRef<NodeJS.Timeout | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setError(``);
    setSuccess(``);

    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { email: string };

    if (!results.email.trim() || !results.email.includes('@')) {
      setError(`Please enter a valid email address`);
      return;
    }

    /* Create an api endpoint and UPSERT an email onto articleNewsletter collection */
    startTransition(async function() {
      const response = await fetch(`/api/subscribe-on-article-newsletter`, {
        method: `POST`,
        headers: {
          'Content-Type': `application/json`
        },
        body: JSON.stringify({
          email: results.email
        })
      }).then((response) => response.json());

      if (response.error) {
        setError(response.message || `Failed to subscribe to the articles newsletter`);
        return;
      }

      setError(``);
      setSuccess(response.message || `Success! You are subscribed!`);
      currObject.reset();

      timer.current = setTimeout(function() {
        setSuccess(``);
        setError(``);
        clearTimeout(timer.current as NodeJS.Timeout);
      }, 4000);

    });
  }


  return (
    <>
      <div className="img-container flex">
        <img src={LadyImage.src}
             alt="a front view young lady in white"
             className="cta__img margin-left-auto" />
      </div>
      <section className="cta-container">
        <div className="cta grid container">
          <div className="cta__content">
            <div className="cta__heading-container">
              <h2 className="cta__heading">Want more news about Hot Articles?</h2>
              <img className="hot-articles-brush" src={BrushImg.src} alt="brush" />
            </div>
            <p className="cta__text">Sign up to Viatours newsletter for <a href="#" className="">hot
              articles</a>,<br /> special
              tour
              propositions, best offers
              you <br />can imagine!</p>
            <div className="cta__form-container">
              <div className={`flex`}>
                {error && <p className="paragraph paragraph-error">{error}</p>}
                {success && <p className="paragraph paragraph-success">{success}</p>}
              </div>
              <form onSubmit={handleSubmit} className="cta__form">
                <label>
                  <input disabled={isPending} name={`email`} type="email" className="cta__form-input"
                         placeholder="Your email"
                         required />
                </label>
                <button disabled={isPending} className="cta__form-submit">{
                  isPending ? `Wait...` : `Subscribe`
                }</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
