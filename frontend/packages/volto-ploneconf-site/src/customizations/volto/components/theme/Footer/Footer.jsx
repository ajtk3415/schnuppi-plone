/**
 * Custom site footer.
 *
 * Shadows @plone/volto/components/theme/Footer/Footer.
 * Markup lives here, styling lives in ./Footer.scss.
 */
import { Container } from 'semantic-ui-react';
import { useSelector, shallowEqual } from 'react-redux';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import { flattenToAppURL, addAppURL } from '@plone/volto/helpers/Url/Url';

import './Footer.scss';

// Edit these to change the footer content.
const SITE_NAME = 'Schnuppi';
const FOOTER_TEXT = 'Short description or address goes here.';
const FOOTER_LINKS = [
  // { title: 'Contact', href: '/contact' },
  // { title: 'Imprint', href: '/imprint' },
];

const Footer = () => {
  // Site actions (sitemap, accessibility, contact, ...) as configured in Plone
  const siteActions = useSelector(
    (state) => state.actions?.actions?.site_actions || [],
    shallowEqual,
  );

  const links = [
    ...siteActions.map((item) => ({
      title: item.title,
      href: item.url ? flattenToAppURL(item.url) : addAppURL(item.id),
    })),
    ...FOOTER_LINKS,
  ];

  return (
    <footer
      id="footer"
      className="site-footer"
      role="contentinfo"
      aria-label="Footer"
      tabIndex="-1"
    >
      <Container>
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-site-name">{SITE_NAME}</div>
            {FOOTER_TEXT && <p className="footer-text">{FOOTER_TEXT}</p>}
          </div>
          {links.length > 0 && (
            <ul className="footer-links">
              {links.map((link) => (
                <li key={link.href}>
                  <UniversalLink href={link.href}>{link.title}</UniversalLink>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} {SITE_NAME}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
