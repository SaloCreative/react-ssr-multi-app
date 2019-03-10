import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LogoWrap = styled.div`
  font-size: ${ props => props.width }px;
  margin: 2.5em auto;
  max-width: 20em;
  width: 100%;
  font-family: 'bebas_neuebook', Arial, Helvetica, sans-serif;
  overflow: hidden;
  padding: ${ props => props.padding };
`;

const SVGContainer = styled.div`
  max-width: 20em;
  width: 100%;
  padding-bottom: 37.5%;
  position: relative;
`;

const SVG = styled.svg`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

const TagLine = styled.span`
  display: block;
  padding: 0.5em 0 0;
  font-size: 3em;
  letter-spacing: 0.55em;
  color: #c7dfe4;
`;

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.logoWrapper = React.createRef();
    this.state = {
      width: parseInt(props.width, 10) / 20
    };
  }

  componentDidMount() {
    this.evaluateWidth();
    window.addEventListener('resize', this.evaluateWidth.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.evaluateWidth.bind(this));
  }

  evaluateWidth() {
    const { width } = this.props;
    const containerWidth = this.logoWrapper.current.getBoundingClientRect().width;
    const newWidth = containerWidth < width ? containerWidth : width;
    this.setState({ width: parseInt(newWidth, 10) / 20 });
  }

  renderTagLine() {
    const { showTagLine } = this.props;
    if (!showTagLine) return null;
    return <TagLine>Creative</TagLine>;
  }
  render() {
    const { link, padding } = this.props;
    return (
      <a
        style={ { textDecoration: 'none' } }
        href={ link.url }
        target={ link.target }
        ref={ this.logoWrapper }
      >
        <LogoWrap width={ this.state.width } padding={ padding }>
          <SVGContainer>
            <SVG
              version='1.0'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 2293 844'
              preserveAspectRatio='xMidYMid meet'
            >
              <g
                transform='translate(0,844) scale(0.1,-0.1)'
                fill='#00aced'
                stroke='none'
              >
                <path
                  fill='#c7dfe4'
                  d='M3585 7284 c-550 -60 -1087 -272 -1530 -604 -611 -458 -1033 -1118
        -1189 -1858 -52 -246 -60 -338 -60 -647 0 -309 8 -401 60 -647 93 -441 284
        -863 554 -1223 458 -611 1118 -1033 1858 -1189 246 -52 338 -60 647 -60 309 0
        401 8 647 60 441 93 863 284 1223 554 468 351 836 833 1045 1368 l20 53 -245
        120 c-135 65 -249 119 -253 119 -4 0 -20 -36 -35 -79 -66 -188 -224 -466 -375
        -661 -91 -117 -287 -316 -407 -413 -377 -305 -830 -496 -1320 -558 -129 -16
        -471 -16 -600 0 -474 60 -913 241 -1285 529 -117 91 -316 287 -413 407 -305
        377 -496 830 -558 1320 -16 129 -16 471 0 600 60 474 241 913 529 1285 91 117
        287 316 407 413 377 305 830 496 1320 558 55 7 190 13 300 13 306 0 529 -36
        815 -130 369 -122 692 -319 979 -599 287 -280 513 -631 634 -988 6 -15 40 0
        257 108 l250 125 -21 52 c-208 535 -576 1017 -1044 1368 -449 337 -985 546
        -1547 605 -180 18 -485 18 -663 -1z'
                />
                <path d='M3639 8339 c-1389 -94 -2637 -877 -3339 -2094 -69 -119 -204 -394
        -215 -435 -6 -25 2 -29 242 -144 136 -65 286 -136 333 -158 141 -68 6383
        -3158 6388 -3163 7 -7 -67 -126 -155 -252 -252 -360 -605 -702 -975 -946 -478
        -315 -964 -493 -1566 -574 -179 -24 -675 -24 -854 0 -602 81 -1088 259 -1566
        574 -592 390 -1079 973 -1346 1613 -27 63 -52 119 -56 124 -6 6 -500 -137
        -519 -151 -7 -5 81 -217 153 -368 431 -897 1185 -1623 2096 -2018 589 -256
        1246 -374 1873 -339 257 15 397 32 626 78 1169 235 2190 973 2788 2014 91 159
        253 494 253 525 0 9 -468 236 -494 240 -12 2 -358 170 -771 375 -412 205
        -1108 549 -1545 765 -1166 576 -4154 2056 -4158 2059 -7 7 167 257 262 376
        122 153 391 424 544 548 930 754 2148 1000 3305 668 866 -249 1631 -843 2104
        -1636 78 -132 181 -336 229 -457 16 -40 32 -73 37 -73 4 0 115 54 247 120 227
        114 239 121 231 142 -5 13 -27 64 -49 114 -386 875 -1091 1614 -1947 2042
        -663 331 -1415 482 -2156 431z'
                />
                <path d='M10795 8368 c-5 -16 -1865 -8253 -1865 -8262 0 -9 510 -7 511 2 0 4
        96 414 212 912 l212 905 1335 0 1334 0 212 -910 c118 -501 213 -911 214 -912
        0 -2 126 -3 280 -3 l280 0 -5 22 c-3 13 -431 1870 -950 4128 -520 2258 -947
        4111 -950 4118 -3 9 -95 12 -410 12 -316 0 -407 -3 -410 -12z m1025 -3300
        c341 -1451 620 -2645 620 -2653 0 -13 -140 -15 -1241 -15 l-1241 0 4 32 c2 18
        278 1220 613 2672 411 1782 612 2633 617 2620 5 -11 287 -1206 628 -2656z'
                />
                <path d='M14740 4235 l0 -4135 1625 0 1625 0 0 250 0 250 -1345 0 -1345 0 0
        3885 0 3885 -280 0 -280 0 0 -4135z'
                />
                <path d='M20875 8434 c-456 -35 -789 -160 -1083 -406 -284 -239 -488 -626
        -577 -1095 -51 -268 -48 -162 -53 -2578 -3 -2332 -2 -2471 38 -2725 92 -598
        338 -1034 735 -1299 225 -151 458 -236 770 -283 136 -20 540 -17 685 5 411 63
        729 216 991 477 336 335 507 795 539 1448 13 258 13 4255 0 4512 -18 374 -76
        658 -188 923 -242 570 -733 925 -1391 1006 -93 12 -387 21 -466 15z m508 -523
        c391 -85 624 -270 798 -635 86 -180 133 -349 164 -579 13 -104 15 -404 15
        -2458 0 -1594 -3 -2371 -11 -2437 -40 -361 -179 -710 -370 -926 -109 -124
        -302 -240 -484 -291 -282 -81 -703 -76 -963 10 -164 55 -330 158 -423 263
        -151 171 -283 457 -338 732 -47 240 -46 159 -46 2645 0 2240 1 2356 19 2480
        34 241 93 439 181 615 175 348 436 534 835 595 143 21 493 13 623 -14z'
                />
              </g>
            </SVG>
          </SVGContainer>
          { this.renderTagLine() }
        </LogoWrap>
      </a>
    );
  }
}

Logo.defaultProps = {
  link: {
    url: '/',
    target: ''
  },
  showTagLine: true,
  width: 100,
  padding: '0 0 0'
};

Logo.propTypes = {
  link: PropTypes.object,
  showTagLine: PropTypes.bool,
  width: PropTypes.number,
  padding: PropTypes.string
};

export default Logo;