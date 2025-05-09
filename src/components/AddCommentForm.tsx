'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { Sighting } from '@prisma/client';
import { addComment } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddCommentSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: { note: string; sightingId: number; owner: string }) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addComment(data);
  swal('Success', 'Your comment has been posted', 'success', {
    timer: 2000,
  });
};

const AddCommentForm = ({ sighting }: { sighting: Sighting }) => {
  const { data: session, status } = useSession();
  // console.log('AddStuffForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddCommentSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <input type="text" {...register('note')} className={`form-control ${errors.note ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.note?.message}</div>
          </Form.Group>
          <input type="hidden" {...register('owner')} value={currentUser} />
          <input type="hidden" {...register('sightingId')} value={sighting.id} />
          <Form.Group className="form-group">
            <Row className="pt-3">
              <Col>
                <Button type="submit" variant="primary">
                  Comment
                </Button>
              </Col>
              <Col>
                <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                  Clear
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddCommentForm;
