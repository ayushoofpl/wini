import '../scss/app.scss';
import 'bootstrap/js/src/collapse';
import 'bootstrap/js/src/tab';
import './Components/PageMainnav/page-mainnav';
import './Components/PageMobilenav/page-mobilenav';
import './Components/PageBar/page-bar';
import './Components/XIcon/x-icon';
import './Components/XCollapseSelect/x-collapse-select';
import './Components/XTabSelect/x-tab-select';
import './Components/UPID/upid';
import './Components/ContactPersons/contactpersons';
import './Components/ScrollToAccordion/scroll-to-accordion';

if (document.querySelector('x-copy')) {
  import(/* webpackChunkName: "Components/XCopy/x-copy" */ './Components/XCopy/x-copy');
}

if (document.querySelector('x-teaser') || document.querySelector('.teaser-slide')) {
  import(/* webpackChunkName: "Components/XTeaser/x-teaser" */ './Components/XTeaser/x-teaser');
}

if (document.querySelector('x-column-slider')) {
  import(/* webpackChunkName: "Components/XColumnSlider/x-column-slider" */ './Components/XColumnSlider/x-column-slider');
}

if (document.querySelector('x-context-nav')) {
  import(/* webpackChunkName: "Components/XContextNav/x-context-nav" */ './Components/XContextNav/x-context-nav');
}

if (document.querySelector('x-circle-progress')) {
  import(/* webpackChunkName: "Components/XCircleProgress/x-circle-progress" */ './Components/XCircleProgress/x-circle-progress');
}

if (document.querySelector('x-masonry')) {
  import(/* webpackChunkName: "Components/XMasonry/x-masonry" */ './Components/XMasonry/x-masonry');
}
if (document.querySelector('X-hotspot')) {
  import(/* webpackChunkName: "Components/XHotspot/x-hotspot" */ './Components/XHotspot/x-hotspot');
}
if (document.querySelector('.pcon-ui-iframe')) {
  import(/* webpackChunkName: "Components/Pcon/pcon" */ './Components/Pcon/pcon');
}
if (document.querySelector('#upid')) {
  import(/* webpackChunkName: "Components/UPID/upid" */ './Components/UPID/upid');
}
if (document.querySelector('.contact-person-cards')) {
  import(/* webpackChunkName: "Components/ContactPersons/contactpersons" */ './Components/ContactPersons/contactpersons');
}
if (document.querySelector('.tx-shop')) {
  import(/* webpackChunkName: "Components/Shop/shop" */ './Components/Shop/shop');
}

if (document.querySelector('#file-upload')) {
  import(/* webpackChunkName: "Components/Reclamation/uploadpreview" */ './Components/Reclamation/uploadpreview');
}

if (document.querySelector('[data-fancybox]')) {
  import('@fancyapps/ui/dist/fancybox/fancybox.css');
  import(/* webpackChunkName: "Libs/fancybox" */ '@fancyapps/ui').then(({ Fancybox }) => {
    Fancybox.bind();
  });
}
