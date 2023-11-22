import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Page Not Found</p>
      <p className="not-found__description">The page you are looking for doesn't exist or has been moved.</p>
    </div>
  );
};

export default NotFoundPage;
