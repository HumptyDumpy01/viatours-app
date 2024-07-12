// 'use client';

/*interface PopularThingsGalleryInterface {
  // children: ReactNode;
}*/
export default function PopularThingsGallery(/*{  }: PopularThingsGalleryInterface*/) {
  return (
    <>
      <div className="popular-things-to-do__tours grid grid-five-cols">
        <div className="popular-things-to-do__tour popular-things-to-do__tours-1">
          <a href="#" className="popular-things-to-do__tour-link">
            <img data-src="img/popularThingsToDo/cruises.svg" className="lazy-img"
                 src="img/popularThingsToDo/cruises-lazy.jpg"
                 alt="cruises image" />
            <p className="popular-things-to-do__tour-title">Cruises</p>
          </a>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-2">
          <a href="#" className="popular-things-to-do__tour-link">
            <img data-src="img/popularThingsToDo/museumTour.svg" className="lazy-img"
                 src="img/popularThingsToDo/museumTour-lazy.jpg"
                 alt="museum tour image" />
            <p className="popular-things-to-do__tour-title">Museum Tour</p>
          </a>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-3">
          <a href="#" className="popular-things-to-do__tour-link">
            <img data-src="img/popularThingsToDo/beachTours.svg" className="lazy-img"
                 src="img/popularThingsToDo/beachTours-lazy.jpg"
                 alt="two people on the beach image" />
            <p className="popular-things-to-do__tour-title">Beach Tours</p>
          </a>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-4">
          <a href="#" className="popular-things-to-do__tour-link">
            <img data-src="img/popularThingsToDo/cityTours.svg" className="lazy-img"
                 src="img/popularThingsToDo/cityTours-lazy.jpg"
                 alt="city tours image" />
            <p className="popular-things-to-do__tour-title">City Tours</p>
          </a>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-5">
          <a href="#" className="popular-things-to-do__tour-link">
            <img data-src="img/popularThingsToDo/food.svg" className="lazy-img"
                 src="img/popularThingsToDo/food-lazy.jpg"
                 alt="restaurant image" />
            <p className="popular-things-to-do__tour-title">Food</p>
          </a>
        </div>
        <div className="popular-things-to-do__tour popular-things-to-do__tours-6">
          <a href="#" className="popular-things-to-do__tour-link">
            <img data-src="img/popularThingsToDo/hiking.svg" className="lazy-img"
                 src="img/popularThingsToDo/hiking-lazy.jpg"
                 alt="two people on a hike image" />
            <p className="popular-things-to-do__tour-title">Hiking</p>
          </a>
        </div>
      </div>
    </>
  );
}
