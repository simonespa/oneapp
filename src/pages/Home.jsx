import React, { memo } from 'react';

const Home = memo(() => (
  <>
    <h2>Home</h2>
    <p>This is the Home Page</p>
  </>
));

Home.displayName = 'HomePage';

export default Home;
