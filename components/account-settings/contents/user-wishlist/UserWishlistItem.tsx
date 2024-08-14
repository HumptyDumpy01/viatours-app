// 'use client';

export type UserWishlistItemType = {
  _id: string;
  title: string;
  image: string;
  location: string;
  rating: number;
  reviews: number;
  duration: string;
  fromPrice: number;

  // children: ReactNode;
}[]

export default function UserWishlistItem({}: UserWishlistItemType) {
  return (
    <>
      <div className="wishlist-items__item">
        <div className="wishlist-items__img-wrapper">
          <img data-src="img/wishlist/wishlist-img-1.png" src="img/wishlist/wishlist-img-1-lazy.webp"
               alt="wishlist item image" className="wishlist-items__img lazy-img" />
          <svg className="wishlist-items__delete-item" xmlns="http://www.w3.org/2000/svg" width="23" height="22"
               viewBox="0 0 23 22" fill="none">
            <path
              d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
              fill="white" />
            <path className="wishlist-items__delete-item__path"
                  d="M11.0152 0C4.87815 0 0 4.86322 0 10.9815C0 17.0997 4.87815 21.9629 11.0152 21.9629C17.1522 21.9629 22.0304 17.0997 22.0304 10.9815C22.0304 4.86322 17.1522 0 11.0152 0ZM15.2639 16.4722L11.0152 12.2365L6.76647 16.4722L5.50759 15.2172L9.7563 10.9815L5.50759 6.74576L6.76647 5.49073L11.0152 9.72644L15.2639 5.49073L16.5228 6.74576L12.2741 10.9815L16.5228 15.2172L15.2639 16.4722Z"
                  fill="#EB662B" />
          </svg>

        </div>
        <div className="wishlist-items__info-wrapper">
          <svg className="wishlist-items__map" xmlns="http://www.w3.org/2000/svg" width="31" height="31"
               viewBox="0 0 31 31"
               fill="none">
            <circle cx="15.0098" cy="15.4517" r="15.0098" fill="#4A43C4" />
            <path
              d="M16.7357 14.0945L18.069 15.3445M18.069 15.3445L19.4023 16.5945M18.069 15.3445L19.4023 14.0945M18.069 15.3445L16.7357 16.5945M13.4023 10.3433L9.40234 12.8433V20.3433L13.4023 18.4683L17.4023 20.3433L21.4023 17.8433V10.3433L17.4023 12.2183L13.4023 10.3433Z"
              stroke="#EFF7F1" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div className="wishlist-items__info-location flex flex-align-center">
            <svg className="wishlist-items__info-location--icon" xmlns="http://www.w3.org/2000/svg" width="12"
                 height="15"
                 viewBox="0 0 12 15" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M6.53664 11.9227C9.08303 11.4916 11.0253 9.27279 11.0253 6.60403C11.0253 3.62685 8.60825 1.20979 5.63107 1.20979C2.65389 1.20979 0.236832 3.62685 0.236832 6.60403C0.236832 9.27279 2.17912 11.4916 4.72551 11.9227L5.63107 13.96L6.53664 11.9227ZM5.63107 4.64262C4.54852 4.64262 3.66937 5.52148 3.66937 6.60403C3.66937 7.68658 4.54852 8.56576 5.63107 8.56576C6.71362 8.56576 7.59277 7.68658 7.59277 6.60403C7.59277 5.52148 6.71362 4.64262 5.63107 4.64262Z"
                    fill="#FDF0EA" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.28314 5.6021C4.08724 5.87435 3.97163 6.20851 3.97163 6.56944C3.97163 7.48489 4.71509 8.22835 5.63051 8.22835C6.54596 8.22835 7.28942 7.48489 7.28942 6.56944C7.28942 5.65402 6.54596 4.91056 5.63051 4.91056C5.36182 4.91056 5.10794 4.97461 4.8835 5.08827C4.734 5.1639 4.55095 5.10397 4.47529 4.95427C4.39965 4.80477 4.45958 4.62189 4.60928 4.54625C4.91615 4.39085 5.26317 4.30324 5.63051 4.30324C6.88138 4.30324 7.89673 5.3186 7.89673 6.56944C7.89673 7.8203 6.88138 8.83566 5.63051 8.83566C4.37967 8.83566 3.36432 7.8203 3.36432 6.56944C3.36432 6.07614 3.52219 5.6194 3.79018 5.24724C3.88812 5.11108 4.07814 5.08023 4.2141 5.17818C4.35023 5.27612 4.38108 5.46597 4.28314 5.6021Z"
                    fill="#EB662B" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M9.99117 9.24312C10.4931 8.45441 10.7838 7.51865 10.7838 6.51575C10.7838 3.70749 8.50346 1.42715 5.6952 1.42715C2.88694 1.42715 0.606597 3.70749 0.606597 6.51575C0.606597 9.03332 2.43841 11.1264 4.84081 11.5328C4.94079 11.5499 5.02609 11.6156 5.06726 11.7087L5.6952 13.1215L6.32312 11.7087C6.36429 11.6156 6.44959 11.5499 6.5496 11.5328C7.36183 11.3955 8.10835 11.0651 8.74118 10.5911C8.875 10.4906 9.0657 10.5181 9.16617 10.6519C9.26617 10.7862 9.23921 10.9764 9.1049 11.0769C8.43875 11.5759 7.65936 11.9328 6.81232 12.1014C6.8128 12.1014 5.97263 13.9915 5.97263 13.9915C5.92362 14.1013 5.81529 14.1719 5.6952 14.1719C5.5751 14.1719 5.46676 14.1013 5.41775 13.9915L4.57758 12.1014C1.96883 11.5818 -0.000228882 9.27694 -0.000228882 6.51575C-0.000228882 3.37219 2.55165 0.820312 5.6952 0.820312C8.83873 0.820312 11.3906 3.37219 11.3906 6.51575C11.3906 7.63876 11.0647 8.68628 10.5029 9.5691C10.4127 9.71028 10.225 9.75193 10.0838 9.66224C9.94264 9.57204 9.90096 9.3843 9.99117 9.24312Z"
                    fill="#EB662B" />
              <path
                d="M9.65349 10.48C9.48583 10.48 9.3499 10.3441 9.3499 10.1764C9.3499 10.0088 9.48583 9.87286 9.65349 9.87286C9.82115 9.87286 9.95706 10.0088 9.95706 10.1764C9.95706 10.3441 9.82115 10.48 9.65349 10.48Z"
                fill="#EB662B" />
            </svg>
            <span className="inline-block wishlist-items__info-location-span">Paris, France</span>
          </div>
          <h2 className="wishlist-items__info-title">Centipede Tour - Guided Arizona
            Desert Tour by ATV</h2>
          <div className="wishlist-items__info-rating flex flex-align-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
              <g clip-path="url(#clip0_803_794)">
                <path
                  d="M6.5 0.171875L8.70947 3.93893L13 4.86157L10.075 8.11238L10.5172 12.4497L6.5 10.6917L2.48278 12.4497L2.925 8.11238L0 4.86157L4.29053 3.93893L6.5 0.171875Z"
                  fill="#F28555" />
              </g>
              <defs>
                <clipPath id="clip0_803_794">
                  <rect width="13" height="13" fill="white" transform="translate(0 0.171875)" />
                </clipPath>
              </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
              <g clip-path="url(#clip0_803_794)">
                <path
                  d="M6.5 0.171875L8.70947 3.93893L13 4.86157L10.075 8.11238L10.5172 12.4497L6.5 10.6917L2.48278 12.4497L2.925 8.11238L0 4.86157L4.29053 3.93893L6.5 0.171875Z"
                  fill="#F28555" />
              </g>
              <defs>
                <clipPath id="clip0_803_794">
                  <rect width="13" height="13" fill="white" transform="translate(0 0.171875)" />
                </clipPath>
              </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
              <g clip-path="url(#clip0_803_794)">
                <path
                  d="M6.5 0.171875L8.70947 3.93893L13 4.86157L10.075 8.11238L10.5172 12.4497L6.5 10.6917L2.48278 12.4497L2.925 8.11238L0 4.86157L4.29053 3.93893L6.5 0.171875Z"
                  fill="#F28555" />
              </g>
              <defs>
                <clipPath id="clip0_803_794">
                  <rect width="13" height="13" fill="white" transform="translate(0 0.171875)" />
                </clipPath>
              </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
              <g clip-path="url(#clip0_803_794)">
                <path
                  d="M6.5 0.171875L8.70947 3.93893L13 4.86157L10.075 8.11238L10.5172 12.4497L6.5 10.6917L2.48278 12.4497L2.925 8.11238L0 4.86157L4.29053 3.93893L6.5 0.171875Z"
                  fill="#F28555" />
              </g>
              <defs>
                <clipPath id="clip0_803_794">
                  <rect width="13" height="13" fill="white" transform="translate(0 0.171875)" />
                </clipPath>
              </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
              <g clip-path="url(#clip0_803_802)">
                <path
                  d="M6.5 0.894043L8.70947 4.6611L13 5.58374L10.075 8.83455L10.5172 13.1718L6.5 11.4139L2.48278 13.1718L2.925 8.83455L0 5.58374L4.29053 4.6611L6.5 0.894043Z"
                  fill="#F2F2F2" />
                <path
                  d="M2.48278 13.1718L6.5 11.4139V0.894043L4.29053 4.6611L0 5.58374L2.925 8.83455L2.48278 13.1718Z"
                  fill="#FFCB45" />
                <path
                  d="M2.48278 13.1718L6.5 11.4139V0.894043L4.29053 4.6611L0 5.58374L2.925 8.83455L2.48278 13.1718Z"
                  fill="#F28555" />
              </g>
              <defs>
                <clipPath id="clip0_803_802">
                  <rect width="13" height="13" fill="white" transform="translate(0 0.171875)" />
                </clipPath>
              </defs>
            </svg>
            <span className="inline-block wishlist-items__info-rating-rate">4.8 <span
              className="inline-block">(243)</span></span>
          </div>
          <div className="wishlist-items__info-price-and-duration flex flex-align-center flex-space-between">
            <span className="wishlist-items__info-duration">4 days</span>
            <span className="wishlist-items__info-price">From <span className="inline-block price">$99.00</span></span>
          </div>
        </div>
      </div>
    </>
  );
}
