import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { Col, Container, Row } from 'react-bootstrap';
import { Sighting, Comment } from '@prisma/client';
// eslint-disable-next-line import/extensions
import SightingCard from '@/components/SightingCard';
// eslint-disable-next-line import/extensions
import { prisma } from '@/lib/prisma';

const ListAllSightings = async () => {
  const session = await getServerSession(authOptions);
  // doesn't protect the page for only logged in users

  // Get all sightings regardless of user
  const sightings: Sighting[] = await prisma.sighting.findMany();
  const comments: Comment[] = await prisma.comment.findMany();

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">All Sightings</h1>
              <Row xs={1} md={2} lg={3} className="g-4">
                {sightings.map((sighting) => (
                  <Col>
                    <SightingCard
                      sighting={sighting}
                      comments={comments.filter((comment) => comment.sightingId === sighting.id)}
                      currentUserEmail={session?.user?.email ?? null}
                      currentUserRole={session?.user?.role ?? null}
                    />
                    { /* also includes who made the sighting */}
                    <div className="mt-2 text-center small text-muted">
                      {`Submitted by: ${sighting.owner}`}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default ListAllSightings;
