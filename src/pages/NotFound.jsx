import React, { memo } from 'react';

const NotFoundPage = memo(() => (
  <>
    <h2>404</h2>
    <p>Page not found!</p>
  </>
));

NotFoundPage.displayName = 'NotFoundPage';

export default NotFoundPage;
