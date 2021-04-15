import React from 'react';

function PostHeader({author, date}) {
  return (
    <div className="post-header">
      <img className="avatar" src={author.avatar} alt="User profile image"/>
      <div className="details">
        <span>{author.name}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}

function PostComments({ comments }) {
  return (
    <div className="post-comments">
      <div className="divider" />
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <img className="avatar" src={comment.author.avatar} />
          <p>
            <span>{comment.author.name}</span>
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}

function PostItem({ author, date, content, comments }) {
  return (
    <div className="postItem">
      <PostHeader author={author} date={date} />
      <div className="post-content">
      <p>{content}</p>
    </div>
      <PostComments comments={comments} />
    </div>
  )
}

export default PostItem;