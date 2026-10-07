/**
 * Custom site logo.
 *
 * Shadows @plone/volto/components/theme/Logo/Logo.
 * Shows /Logo.svg, which lives in this add-on's `public/Logo.svg`.
 * A logo uploaded in Plone's Site control panel still takes precedence.
 */
import { defineMessages, useIntl } from 'react-intl';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getNavroot } from '@plone/volto/actions/navroot/navroot';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';
import Image from '@plone/volto/components/theme/Image/Image';

const LOGO_URL = '/Logo.svg';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  logoOf: {
    id: 'Logo of',
    defaultMessage: 'Logo of',
  },
});

const Logo = () => {
  const pathname = useLocation().pathname;
  const site = useSelector((state) => state.site.data);
  const navroot = useSelector((state) => state.navroot.data);
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    if (pathname && !hasApiExpander('navroot', getBaseUrl(pathname))) {
      dispatch(getNavroot(getBaseUrl(pathname)));
    }
  }, [dispatch, pathname]);

  const navRootPath = flattenToAppURL(navroot?.navroot?.['@id']) || '/';

  return (
    <Link to={navRootPath} aria-label={intl.formatMessage(messages.home)}>
      <Image
        className="ui image"
        src={
          site['plone.site_logo']
            ? flattenToAppURL(site['plone.site_logo'])
            : LOGO_URL
        }
        alt={
          intl.formatMessage(messages.logoOf) + ' ' + site['plone.site_title']
        }
      />
    </Link>
  );
};

export default Logo;
