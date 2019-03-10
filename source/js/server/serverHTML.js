import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

import { outputFiles } from '../../../webpack/output-files';
import { ENV } from '../helpers';

const RenderWarning = () => (
  <script
    dangerouslySetInnerHTML={ {
      __html: 'console.error(\'🚨 Error rendering react on server 🚨. Page loaded without SSR\')'
    } }
  />
);

const ApolloWarning = () => (
  <script
    dangerouslySetInnerHTML={ {
      __html: 'console.error(\'🚨 Apollo error on server 🚨. Page loaded without Apollo data\')'
    } }
  />
);

const ServerHtml = ({
  appHtml, apolloState, helmet, styles, i18n, appName
}) => (
  <html lang={ i18n.locale }>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' />
      <meta name='format-detection' content='telephone=no' />
      <meta httpEquiv='Accept-CH' content='DPR, Viewport-Width, Width' />
      { helmet.title.toComponent() }
      { helmet.meta.toComponent() }
      { helmet.style.toComponent() }
      { styles.getStyleElement() }
      <link rel='shortcut icon' type='image/png' href={ `/${ outputFiles.favicon }` } />
      <link rel='stylesheet' href={ `/${ outputFiles.css }` } />
    </head>
    <body>
      <div
        id='root'
        dangerouslySetInnerHTML={ { __html: appHtml.html } } // eslint-disable-line
      />
      { appHtml.error && <RenderWarning /> }
      <script
        type='text/javascript'
        dangerouslySetInnerHTML={ { __html: `window.__APOLLO_STATE__=${ apolloState.state };` } } // eslint-disable-line
      />
      { apolloState.error && ENV === 'development' && <ApolloWarning /> }
      <script
        charSet='UTF-8'
        dangerouslySetInnerHTML={ { __html: `window.__i18n=${ serialize(i18n) };` } } // eslint-disable-line
      />
      <script type='text/javascript' src={ `/${ outputFiles.vendor }` } />
      <script type='text/javascript' src={ `/${ outputFiles.client.replace(':name', appName) }` } />
      <script type='text/javascript' src='https://cdn.polyfill.io/v2/polyfill.min.js' />
    </body>
  </html>
);

ServerHtml.propTypes = {
  appHtml: PropTypes.object.isRequired,
  apolloState: PropTypes.object.isRequired,
  appName: PropTypes.string.isRequired,
  helmet: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired
};

const getServerHtml = ({
  appHtml, apolloState, helmet, styles, i18n, appName
}) => {
  return `<!doctype html>${ ReactDOMServer.renderToStaticMarkup(<ServerHtml
    appHtml={ appHtml }
    apolloState={ apolloState }
    helmet={ helmet }
    styles={ styles }
    i18n={ i18n }
    appName={ appName }
  />) }`;
};

export default getServerHtml;