import { Col, Link, Row } from '@canonical/react-components';

export const getStaticProps = async () => {
  const request = await fetch(
    `https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json`
  );
  const posts = await request.json();

  return { props: { posts } };
};

const getFormattedDate = (dateStr) => {
  const date = new Date(dateStr);
  return (
    date.getDate() +
    ' ' +
    date.toLocaleString('default', { month: 'long' }) +
    ' ' +
    date.getFullYear()
  );
};

export default function Home({ posts }) {
  return (
    <>
      <Row className="u-equal-height">
        {posts.map((post) => (
          <Col key={post.id} size={4} className="p-card p-card--blog-post">
            <header className="p-card__header">
              <h5 className="p-muted-heading">Category TBA</h5>
            </header>
            <div className="p-card__content">
              <Link href={post.link}>
                <img
                  className="p-card__image"
                  alt=""
                  loading="lazy"
                  src={post.featured_media}
                />
              </Link>

              <h3 className="p-heading--4 u-sv-1">
                <Link href={post.link}>{post.title.rendered}</Link>
              </h3>
              <p>
                <em>
                  By{' '}
                  <Link href={post._embedded.author[0].link}>
                    {post._embedded.author[0].name}
                  </Link>{' '}
                  on {getFormattedDate(post.date)}
                </em>
              </p>
            </div>
            <p className="p-text--small p-card__footer">Article</p>
          </Col>
        ))}
      </Row>
    </>
  );
}
