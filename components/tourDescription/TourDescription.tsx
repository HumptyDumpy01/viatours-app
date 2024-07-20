// 'use client';
import '@/components/homepage/top-trending/TopTrending.scss';
import TourDescriptionNavigation from '@/components/tourDescription/TourDescriptionNav/TourDescriptionNavigation';
import DescriptionTag from '@/components/tourDescription/DescriptionTag';
import { DUMMY_TOURS } from '@/data/DUMMY_TOURS';
import { notFound } from 'next/navigation';
import TourStats from '@/components/tourDescription/TourStats';
import Gallery from '@/components/UI/Gallery/Gallery';
import DescriptionOverview from '@/components/tourDescription/TourOverview/DescriptionOverview';
import TourOverviewInfo from '@/components/tourDescription/TourOverview/TourOverviewInfo';
import TourOverviewHeading from '@/components/tourDescription/TourOverview/TourOverviewHeading';
import TourHighlights from '@/components/tourDescription/TourOverview/TourHighlights';
import TourIncluded from '@/components/tourDescription/TourOverview/TourIncluded';
import TourItinerary from '@/components/tourDescription/TourOverview/Itinerary/TourItinerary';
// import GoogleMap from '@/components/UI/Map/Map';
import QuestionAnswer from '@/components/tourDescription/FAQ/QuestionAnswer';
import CustomerReviews from '@/components/tourDescription/CustomerReviews/CustomerReviews';
import TourComments from '@/components/tourDescription/TourOverview/TourComments';
import LeaveReply from '@/components/UI/Layout/LeaveReply';
import TopTrendingHeading from '@/components/homepage/top-trending/TopTrendingHeading';
import TopTrendingSlider from '@/components/homepage/top-trending/TopTrendingSlider';
import TopTrendingWrapper from '@/components/homepage/top-trending/TopTrendingWrapper';
import { Skeleton } from '@mui/material';
import '@/components/UI/Form/SidebarForm.scss';
import React from 'react';

type TourDescriptionType = {
  params: {
    id: string;
  }
  // children: ReactNode;
}

export default function TourDescriptionSection({ params }: TourDescriptionType) {
  const currTour = DUMMY_TOURS.find((item) => item.id === params.id);

  if (!currTour) {
    notFound();
  }

  return (
    <>
      <TourDescriptionNavigation params={params} />
      {/* TEMPORARY */}
      <div style={{ maxWidth: '127.9rem', margin: '0 auto', paddingLeft: '3.8rem' }}>
        <div style={{ display: 'flex', gap: `1rem` }}>
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: 30, height: 20 }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: 30, height: 20 }} />
          <Skeleton variant="text" sx={{ fontSize: '1rem', width: 30, height: 20 }} />
        </div>
      </div>

      <section className="description container">

        <DescriptionTag />

        {/* TEMPORARY */}
        <div style={{ maxWidth: '127.9rem', margin: '0 auto' }}>
          <div style={{ display: `flex`, gap: `1.3rem` }}>
            <Skeleton variant="rounded" sx={{ width: 90, height: 35, borderRadius: `100rem` }} />
            <Skeleton variant="rounded" sx={{ width: 90, height: 35, borderRadius: `100rem` }} />
          </div>
        </div>
        {/* /////////////////////////////////////*/}

        <h1 className="description__heading margin-bottom-small">{currTour.title}</h1>

        {/* TEMPORARY */}
        <div style={{ maxWidth: '127.9rem', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            <Skeleton variant="rounded" sx={{ width: '80%', height: 24 }} />
            <Skeleton variant="rounded" sx={{ width: '50%', height: 24 }} />
          </div>
        </div>
        {/* /////////////////////////////////////*/}

        <div className="description__stats-wrapper flex flex-space-between">
          <TourStats
            info={{
              rating: currTour.rating.overall,
              totalReviews: currTour.reviewed,
              city: currTour.city,
              country: currTour.country,
              booked: currTour.booked
            }}
          />
        </div>
        {/* /////////////////////////////////////*/}

        {/* TEMPORARY */}
        <div style={{ maxWidth: '127.9rem', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            gap: '4rem'
          }}>
            <div style={{ display: 'flex', gap: '.5rem', alignItems: `center` }}>
              <Skeleton variant="circular" width={11} height={11} />
              <Skeleton variant="circular" width={11} height={11} />
              <Skeleton variant="circular" width={11} height={11} />
              <Skeleton variant="circular" width={11} height={11} />
              <Skeleton variant="circular" width={11} height={11} />
              <div style={{ display: 'flex', gap: `.5rem` }}>
                <Skeleton
                  animation="wave"
                  height={11}
                  width="3rem"
                />
                <Skeleton
                  animation="wave"
                  height={11}
                  width="3rem"
                />
              </div>
            </div>
            <div>
              <Skeleton variant="rounded" width={70} height={11} />
            </div>
            <div>
              <Skeleton variant="rounded" width={70} height={11} />
            </div>
          </div>
        </div>
        {/* /////////////////////////////////////*/}

        <Gallery info={{
          images: currTour.images,
          title: currTour.title
        }} />

        {/* TEMPORARY */}
        <div className="description__gallery">
          <div className="description__gallery-images grid">
            <div className="description__gallery-img-1">
              <Skeleton animation={`wave`} variant="rounded" width={`100%`} height={`100%`} sx={{
                borderTopRightRadius: `0`,
                borderBottomRightRadius: `0`
              }} />
            </div>
            <div className="description__gallery-images-container-1 grid grid-two-cols">
              {/*{restOfImages.map((image, index) => (
                  <div key={index} className={`description__gallery-img-${index + 2}`}>
                    <img onClick={openSlider}
                      // @ts-ignore
                         src={image.src || image} alt={info.title} className="description__gallery-img-2" />
                  </div>
                ))}*/}
              <div className={`description__gallery-img-2`}>
                <Skeleton animation={`wave`} variant="rounded" width={`100%`} height={`100%`} sx={{
                  borderTopLeftRadius: `0`,
                  borderBottomLeftRadius: `0`,
                  borderBottomRightRadius: `0`
                }} />
              </div>
              <div className={`description__gallery-img-3`}>
                <Skeleton animation={`wave`} variant="rounded" width={`100%`} height={`100%`} sx={{
                  borderRadius: `0`
                }} />
              </div>
              <div className={`description__gallery-img-4`}>
                <Skeleton animation={`wave`} variant="rounded" width={`100%`} height={`100%`} sx={{
                  borderTopRightRadius: `0`,
                  borderTopLeftRadius: `0`,
                  borderBottomLeftRadius: `0`
                }} />
              </div>
            </div>
          </div>
          <span className={`description__gallery--see-all-skeleton`}>
                  <Skeleton animation={`wave`} variant="rounded" width={`11rem`} height={`3.7rem`}
                            sx={{ borderRadius: `100rem` }} />
            </span>
        </div>
        {/* /////////////////////////////////////*/}
        <DescriptionOverview sideBar={(
          <>
            {/* <SidebarForm
              tourId={currTour.id}
              time={currTour.time}
              price={currTour.price}
              price_for_extra={currTour.price_for_extra}
            />*/}

            {/* TEMPORARY */}
            <form className={`description__tour-overview-sidebar__form`}>
              <div className="description__tour-overview-sidebar">
                <div style={{
                  display: 'flex',
                  gap: '.5rem',
                  marginBottom: `2.4rem`
                }}>
                  <Skeleton variant="rounded" width={50} height={12} />
                  <Skeleton variant="rounded" width={50} height={12} />
                </div>
                <div className="description__tour-overview-sidebar-wrapper">
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem', paddingBottom: `1rem`,
                      paddingTop: `1rem`,
                      paddingLeft: `1rem`,
                      borderBottom: `1px solid #e0e0e0`
                    }}>
                      <Skeleton variant="circular" width={14} height={14} />
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5rem'
                      }}>
                        <Skeleton variant="rounded" width={50} height={10} />
                        <Skeleton variant="rounded" width={70} height={10} />
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem', paddingBottom: `1rem`,
                      paddingTop: `1rem`,
                      paddingLeft: `1rem`
                    }}>
                      <Skeleton variant="circular" width={14} height={14} />
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5rem'
                      }}>
                        <Skeleton variant="rounded" width={50} height={10} />
                        <Skeleton variant="rounded" width={70} height={10} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="description__tour-overview-sidebar__tickets grid">
                  <h3
                    className="tertiary-heading margin-top-sm description__tour-overview-sidebar__tickets-heading">
                    <Skeleton variant="rounded" width={100} height={17} />
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: `column`,
                    gap: `1.4rem`
                  }}>

                    <div className="flex flex-space-between flex-align-center">
                      <div>
                        <Skeleton variant="rounded" width={120} height={13} />
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <Skeleton variant="circular" width={14} height={14} />
                        <Skeleton variant="rounded" width={10} height={13} />
                        <Skeleton variant="circular" width={14} height={14} />
                      </div>
                    </div>
                    <div className="flex flex-space-between flex-align-center">
                      <div>
                        <Skeleton variant="rounded" width={110} height={13} />
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <Skeleton variant="circular" width={14} height={14} />
                        <Skeleton variant="rounded" width={10} height={13} />
                        <Skeleton variant="circular" width={14} height={14} />
                      </div>
                    </div>
                    <div className="flex flex-space-between flex-align-center">
                      <div>
                        <Skeleton variant="rounded" width={90} height={13} />
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <Skeleton variant="circular" width={14} height={14} />
                        <Skeleton variant="rounded" width={10} height={13} />
                        <Skeleton variant="circular" width={14} height={14} />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: `2rem` }} className="description__tour-overview-sidebar__tickets grid">
                  <h3
                    className="tertiary-heading margin-top-sm description__tour-overview-sidebar__tickets-heading">
                    <div>
                      <Skeleton variant="rounded" width={100} height={17} />
                    </div>
                  </h3>
                  <div style={{ marginBottom: `1rem` }}>
                    <div style={{ display: `flex`, justifyContent: `space-between`, gap: `1rem` }}>
                      <div style={{ display: `flex`, gap: `1rem` }}>
                        <Skeleton variant="rounded" width={14} height={14} />
                        <Skeleton variant="rounded" width={100} height={14} />
                      </div>
                      <Skeleton variant="rounded" width={25} height={14} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: `flex`, justifyContent: `space-between`, gap: `1rem` }}>
                      <div style={{ display: `flex`, gap: `1rem` }}>
                        <Skeleton variant="rounded" width={14} height={14} />
                        <Skeleton variant="rounded" width={100} height={14} />
                      </div>
                      <Skeleton variant="rounded" width={25} height={14} />
                    </div>
                  </div>

                </div>
                <div style={{ marginBottom: `5rem` }}>
                  <p className="paragraph paragraph--descr flex">
                    <Skeleton variant="rounded" width={25} height={14} />
                    <span><Skeleton variant="rounded" width={14} height={14} /></span>
                    <Skeleton variant="rounded" width={25} height={14} />
                    <span><Skeleton variant="rounded" width={14} height={14} /></span>
                  </p>
                </div>
                <div style={{ display: `flex`, justifyContent: `space-between` }}>
                  <Skeleton variant="rounded" width={55} height={17} />
                  <Skeleton variant="rounded" width={25} height={17} />
                </div>
                <div>
                  <Skeleton animation={`wave`} variant="rounded" width={125} height={30} />
                </div>

              </div>
            </form>
            {/* /////////////////////////////////////*/}
          </>
        )}>
          {/* TEMPORARY */}
          <div className="description__tour-overview-info">

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Skeleton variant="circular" width={14} height={14} />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5rem'
              }}>
                <Skeleton variant="rounded" width={50} height={10} />
                <Skeleton variant="rounded" width={50} height={10} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Skeleton variant="circular" width={14} height={14} />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5rem'
              }}>
                <Skeleton variant="rounded" width={50} height={10} />
                <Skeleton variant="rounded" width={50} height={10} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Skeleton variant="circular" width={14} height={14} />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5rem'
              }}>
                <Skeleton variant="rounded" width={50} height={10} />
                <Skeleton variant="rounded" width={50} height={10} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Skeleton variant="circular" width={14} height={14} />
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5rem'
              }}>
                <Skeleton variant="rounded" width={50} height={10} />
                <Skeleton variant="rounded" width={50} height={10} />
              </div>
            </div>

          </div>
          {/* /////////////////////////////////////*/}
          <TourOverviewInfo info={
            {
              duration: currTour.duration,
              groupSize: currTour.group_size,
              ages: currTour.ages,
              languages: currTour.languages
            }
          } />

          {/* TEMPORARY */}
          <div className="description__tour-tour-overview">
            <h1 className={`secondary-heading margin-bottom-small`}>
              <Skeleton variant="rounded" width={140} height={20} />
            </h1>
            <p className="paragraph" style={{
              display: `flex`,
              flexDirection: `column`,
              gap: `1rem`,
              marginBottom: `2rem`
            }}>
              <Skeleton variant="rounded" width={`100%`} height={10} />
              <Skeleton variant="rounded" width={`80%`} height={10} />
              <Skeleton variant="rounded" width={`50%`} height={10} />
            </p>
          </div>
          {/* /////////////////////////////////////*/}

          <TourOverviewHeading overview={currTour.overview} />

          {/* TEMPORARY */}
          <div className="description__tour-overview-highlights-wrapper">
            <h3 className={`tertiary-heading margin-bottom-small`}>
              <Skeleton variant="rounded" width={120} height={16} />
            </h3>
            <ul className="description__tour-overview-highlights">
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: `1.5rem` }}>
                <Skeleton variant="circular" width={7} height={7} />
                <Skeleton variant="rounded" width={420} height={8} />
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: `1.5rem` }}>
                <Skeleton variant="circular" width={7} height={7} />
                <Skeleton variant="rounded" width={420} height={8} />
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: `1.5rem` }}>
                <Skeleton variant="circular" width={7} height={7} />
                <Skeleton variant="rounded" width={420} height={8} />
              </li>
              <li style={{ display: 'flex', alignItems: 'center', marginBottom: `1.5rem` }}>
                <Skeleton variant="circular" width={7} height={7} />
                <Skeleton variant="rounded" width={420} height={8} />
              </li>
              <li style={{ display: 'flex', alignItems: 'center' }}>
                <Skeleton variant="circular" width={7} height={7} />
                <Skeleton variant="rounded" width={420} height={8} />
              </li>
            </ul>
          </div>
          {/* /////////////////////////////////////*/}
          <TourHighlights tour_highlights={currTour.tour_highlights} />
          <TourIncluded what_included={currTour.what_included} />
          <TourItinerary itinerary={currTour.itinerary} />
          <h2 className={`subheading`}>Here comes GoogleMap! Enable It when testing or deploying.</h2>
          {/*<GoogleMap locations={currTour.tour_map} />*/}
          <QuestionAnswer />
          <CustomerReviews rating={currTour.rating} />
          <TourComments tourId={currTour.id} />
          <LeaveReply />
        </DescriptionOverview>
      </section>
      <div>
        <TopTrendingHeading heading={`You might also like...`} href={`/tours?query=top`} />
      </div>
      <section className="top-trending container-cta">
        <TopTrendingWrapper>
          <TopTrendingSlider />
        </TopTrendingWrapper>
      </section>

    </>
  );
}
