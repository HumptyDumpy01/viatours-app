// 'use client';

type UserCommentType = {
  initials: string;
  text: string;
  // children: ReactNode;
}

import classes from '@/components/UI/AIAgent/AIAgentLayla.module.scss';

export default function UserComment({ initials, text }: UserCommentType) {
  // abbreviation for the user e.g. if the user is John Doe, the initials would be J.D,
  // or if the username is Bob, then B.
  // if  username is Nikolas von Baker, then N.V
  const abbrInitials = initials.split(' ').map((name: string) => name[0]).join('.');
  // generating current date in e.g. August 14, 13:50 format
  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${month} ${day}, ${hours}:${minutes}`;
  return (
    <>
      <div>
        <div className={`${classes[`ai-box-comment-box`]}`}>
          <div className={`${classes[`ai-box-comment-box-logo-user`]}`}>
            <p>{abbrInitials}</p>
          </div>
          <div className={`${classes[`ai-box-comment-box-initials-container`]}`}>
            <div className={`${classes[`ai-box-comment-box-name-user`]}`}>
              <p>{initials}</p>
            </div>
            <p className={`${classes[`ai-box-comment-box-time`]}`}>{formattedDate}</p>
          </div>

        </div>
        <div className={`${classes[`ai-box-comment-text`]}`}>
          <p>{text.length > 250 ? text.slice(0, 250) + `..` : text}</p>
        </div>
      </div>
    </>
  );
}