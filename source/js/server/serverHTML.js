import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

import { outputFiles } from '../../../webpack/output-files';

const ServerHtml = ({
  appHtml, state, helmet, styles, i18n, appName
}) => (
  <html lang={ i18n.locale }>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0' />

      { helmet.title.toComponent() }
      { helmet.meta.toComponent() }
      { styles.getStyleElement() }
      <link rel='shortcut icon' type='image/png' href={ `/${ outputFiles.favicon }` } />
      <link rel='stylesheet' href={ `/${ outputFiles.css }` } />
    </head>
    <body>
      <div
        id='root'
        dangerouslySetInnerHTML={ { __html: appHtml } } // eslint-disable-line
      />
      <script
        type='text/javascript'
        dangerouslySetInnerHTML={ { __html: `window.__SALO_CREATIVE_STATE__=${ state };` } } // eslint-disable-line
      />
      <script
        charSet='UTF-8'
        dangerouslySetInnerHTML={ { __html: `window.__i18n=${ serialize(i18n) };` } } // eslint-disable-line
      />
      <script type='text/javascript' src={ `/${ outputFiles.vendor }` } />
      <script type='text/javascript' src={ `/${ outputFiles.client.replace(':name', appName) }` } />
      <script src='https://cdn.polyfill.io/v2/polyfill.min.js' />
    </body>
  </html>
);

ServerHtml.propTypes = {
  appHtml: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
  helmet: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired
};

const getServerHtml = ({
  appHtml, state, helmet, styles, i18n, appName
}) => {
  return `<!doctype html>${ ReactDOMServer.renderToString(<ServerHtml
    appHtml={ appHtml }
    state={ state }
    helmet={ helmet }
    styles={ styles }
    i18n={ i18n }
    appName={ appName }
  />) }`;
};

export default getServerHtml;