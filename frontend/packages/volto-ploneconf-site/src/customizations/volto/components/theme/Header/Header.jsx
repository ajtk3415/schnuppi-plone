/**
 * Custom site header.
 *
 * Shadows @plone/volto/components/theme/Header/Header.
 * Markup lives here, styling lives in ./Header.scss.
 */
import { Container, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useSelector, shallowEqual } from 'react-redux';

import Anontools from '@plone/volto/components/theme/Anontools/Anontools';
import LanguageSelector from '@plone/volto/components/theme/LanguageSelector/LanguageSelector';
import Logo from '@plone/volto/components/theme/Logo/Logo';
import Navigation from '@plone/volto/components/theme/Navigation/Navigation';

import './Header.scss';

const Header = ({ pathname }) => {
  const token = useSelector((state) => state.userSession.token, shallowEqual);

  return (
    <Segment basic className="header-wrapper site-header" role="banner">
      <Container>
        <div className="header">
          <div className="logo-nav-wrapper">
            <div className="logo">
              <Logo />
            </div>
            <Navigation pathname={pathname} />
          </div>
          <div className="tools-wrapper">
            <LanguageSelector />
            {!token && (
              <div className="tools">
                <Anontools />
              </div>
            )}
          </div>
        </div>
      </Container>
    </Segment>
  );
};

export default Header;

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
};
