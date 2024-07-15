// 'use client';
import './QuestionAnswer.scss';
import AccordionQA from '@/components/UI/Accordion/AccordionQA';
/*type QuestionAnswerType = {
  // children: ReactNode;
}*/

export default function QuestionAnswer(/*{  }: QuestionAnswerType*/) {
  return (
    <section className="faq">
      <h2 className="secondary-heading margin-bottom-small">FAQ</h2>
      <div className="faq__container">
        <AccordionQA
          question={`Can I get the refund?`}
          answer={`Phang Nga Bay Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat
                cancellation policy: For a full
                refund, the cancellation is possible to 24 hours in advance after the journey has started. Discover and
                book Phang
                Nga Bay
                Sea Cave Canoeing & James Bond Island w/ Buffet Lunch by Big Boat.`}
        />
        <AccordionQA
          question={`Can I change the travel date?`}
          answer={`Yes, you can change the travel date. However, please note that any changes are
                subject
                to availability and may incur additional charges. We recommend contacting our customer service team for
                assistance with date changes.`}
        />
        <AccordionQA
          question={`When and where does the tour end?`}
          answer={`The tour typically ends at the same location it started. The exact time can vary
                depending on the specific tour itinerary and traffic conditions. You will receive a detailed schedule
                upon
                booking.`} />
        <AccordionQA
          question={`Do you arrange airport transfers?`}
          answer={`Yes, we do arrange airport transfers. This service may be included in your package or
                available for an additional fee. Please check the details of your booking or contact our customer
                service
                team for more information. `}
        />
      </div>
    </section>
  );
}
