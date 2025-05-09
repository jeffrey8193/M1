'use client';

import { ListGroup } from 'react-bootstrap';
import { Comment } from '@prisma/client';

/* Renders a single Note. See ContactCard.tsx. */
const CommentItem = ({ comment }: { comment: Comment }) => (
  <ListGroup.Item>
    <p className="fw-lighter">{comment.createdAt.toLocaleDateString('en-US')}</p>
    <p className="fw-bold">{comment.owner}</p>
    <p>{comment.note}</p>
  </ListGroup.Item>
);

export default CommentItem;
