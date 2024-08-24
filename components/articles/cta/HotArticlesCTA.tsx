// 'use client';

import LadyImage from '@/assets/images/articles/cta/a-front-view-young-lady-in-white.png';
import BrushImg from '@/assets/images/articles/cta/Brush.png';

import './HotArticlesCTA.scss';
/*type HotArticlesCTAType = {
  // children: ReactNode;
}*/

export default function HotArticlesCTA(/*{  }: HotArticlesCTAType*/) {
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
              <form action="#" className="cta__form">
                <label>
                  <input type="email" className="cta__form-input" placeholder="Your email" required />
                </label>
                <button type="submit" className="cta__form-submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
