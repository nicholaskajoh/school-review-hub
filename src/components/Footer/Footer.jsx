import React from 'react';

// get the current year for footer
function getCurrentYear () {
  return new Date().getFullYear();
}

const Footer = () => {
  return (
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>&copy; School Review Hub</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
