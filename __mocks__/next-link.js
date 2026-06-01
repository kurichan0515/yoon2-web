const React = require('react');
const Link = ({ children, href, ...props }) => React.createElement('a', { href, ...props }, children);
module.exports = Link;
module.exports.default = Link;
