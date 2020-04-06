import React, { memo } from 'react';

const About = memo(function About() {
  return (
    <>
      <h2>About</h2>
      <p>This is the about page</p>
    </>
  );
});

About.displayName = 'AboutPage';

export default About;
