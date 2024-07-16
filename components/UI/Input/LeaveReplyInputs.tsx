// 'use client';
import '@/components/UI/Layout/LeaveReply.scss';
/*type LeaveReplyInputType = {
  // children: ReactNode;
}*/

export default function LeaveReplyInputs(/*{  }: LeaveReplyInputType*/) {
  return (
    <div className="leave-a-reply__form-inputs-container grid">
      <div className="leave-a-reply__form-inputs flex flex-align-center flex-space-between">
        <div className="leave-a-reply__form-inputs-wrapper">
          <label htmlFor="user-initials" />
          <input type="text" name="name" id="user-initials"
                 placeholder="e.g. Lily Brick"
                 required />
        </div>
        <div className="leave-a-reply__form-inputs-wrapper">
          <label htmlFor="user-email" />
          <input type="email" name="user-email" id="user-email"
                 placeholder="Email" required />
        </div>
      </div>
      <label htmlFor="title"></label>
      <input type="text" name="title" id="title"
             className="leave-a-reply__form-inputs-title" placeholder="Title"
             required />
      <label htmlFor="comment"></label>
      <textarea name="comment" id="comment" cols={30} rows={6}
                className="leave-a-reply__form-inputs-comment"
                placeholder="Comment" required></textarea>
    </div>
  );
}
