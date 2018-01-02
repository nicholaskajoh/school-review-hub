import React from 'react';

// get the current year for footer
function getCurrentYear () {
  return new Date().getFullYear();
}

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy;{getCurrentYear()}. School Review Hub</p>
    </div>
  );
};

export default Footer;
