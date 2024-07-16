// 'use client';
import './LeaveReply.scss';
import Rate from '@/components/UI/Checkbox/Rate';
/*type LeaveReplyType = {
  // children: ReactNode;
}*/

export default function LeaveReply(/*{  }: LeaveReplyType*/) {
  return (
    <section className="leave-a-reply">
      <h2 className="secondary-heading margin-bottom-small">Leave a reply</h2>
      <p className="paragraph leave-a-reply-paragraph">Your email address will not be published. All fields are
        required, though.</p>

      <div className="leave-a-reply-form">
        <form method="GET" className="leave-a-reply__form">
          <div className="leave-a-reply__form-rate grid">
            <Rate label={`Location`} name={`location`} />
            <Rate label={`Amenities`} name={`amenities`} />
            <Rate label={`Food`} name={`food`} />
            <Rate label={`Room`} name={`room`} />
            <Rate label={`Price`} name={`price`} />
            <Rate label={`Tour Operator`} name={`tour-operator`} />
          </div>
        </form>
      </div>
    </section>
  );
}
