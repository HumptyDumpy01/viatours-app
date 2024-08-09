// 'use client';
import '@/components/UI/Layout/LeaveReply.scss';

type LeaveReplyInputType = {
  userName: string | null;
  userEmail: string | null;
  // children: ReactNode;
}

export default function LeaveReplyInputs({ userEmail, userName }: LeaveReplyInputType) {
  return (
    <div className="leave-a-reply__form-inputs-container grid">
      <div className="leave-a-reply__form-inputs flex flex-align-center flex-space-between">
        <div className="leave-a-reply__form-inputs-wrapper">
          <label htmlFor="user-initials" />
          <input type="text" defaultValue={userName ? userName : ``} name="user" id="user-initials"
                 placeholder="e.g. Lily Brick"
                 required minLength={2} maxLength={80} />
        </div>
        {!userEmail && (
          <>
            <div className="leave-a-reply__form-inputs-wrapper">
              <label htmlFor="user-email" />
              <input type="email" name="email" id="user-email"
                     placeholder="Email" required />
            </div>
          </>
        )}
      </div>
      <label htmlFor="title"></label>
      <input type="text" name="title" id="title"
             className="leave-a-reply__form-inputs-title" placeholder="Title"
             required maxLength={90} minLength={4} />
      <label htmlFor="comment"></label>
      <textarea name="text" id="comment" cols={30} rows={6}
                className="leave-a-reply__form-inputs-comment"
                placeholder="Comment" minLength={4} maxLength={400} required></textarea>
    </div>
  );
}
