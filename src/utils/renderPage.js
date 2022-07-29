import "intersection-observer";
import "core-js";
import "react-app-polyfill/stable";
import "react-app-polyfill/ie11";

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import flat from "flat";

const messages = require("../i18n/messages.json");

const rootId = "2891b3f0b2e0047bca244fcad1be296d";

import { mapSiteLocaleFactory } from "../i18n/mapSiteLocale";
import { mapSiteUrlFactory } from "../i18n/mapSiteUrl";
import { mapSiteCurrencyFactory } from "../i18n/mapSiteCurrency";
import { languageMapping } from "../i18n/config";
import { SiteContext } from "../i18n/siteContext";

const mapSiteLocale = mapSiteLocaleFactory(languageMapping);
const mapSiteUrl = mapSiteUrlFactory(languageMapping);
const mapSiteCurrency = mapSiteCurrencyFactory();

const locale = mapSiteLocale(window.location.href);
const baseUrl = mapSiteUrl(window.location.href);
const currency = mapSiteCurrency(window.location.href);

const injectLiveReach = () => {
  const script = document.createElement("script");

  script.src = "https://m.liverea.ch/javascripts/embed-js.js";

  document.head.appendChild(script);
};

export const renderPage = (Page) => {

  if (
    process.env.SERVER_ENV === "production" ||
    process.env.SERVER_ENV === "netlify"
  ) {
    injectLiveReach();

    const rootEl = document.getElementById(rootId);
    const cookieNotice = document.querySelector(".s-cookie-hint");
    const backToTop = document.querySelector(".b-back-to-top");
    const footer = document.querySelector(".s-footer");
    const modalEl = document.createElement("div");
    modalEl.setAttribute("id", "rk-modal-container");

    document.body.appendChild(modalEl);

    if (cookieNotice) {
      cookieNotice.style.zIndex = 10000;
      cookieNotice.style.transform = "translateZ(100px)";
    }

    if (backToTop) {
      backToTop.style.zIndex = 10000;
    }

    if (footer) {
      footer.style.position = "relative";
      footer.style.zIndex = 10000;
    }

    ReactDOM.render(
      <Suspense fallback={<div />}>
        <IntlProvider locale={locale} messages={flat(messages[locale])}>
          <SiteContext.Provider value={{ baseUrl, currency, locale }}>
            <BrowserRouter>
              <Page />
            </BrowserRouter>
          </SiteContext.Provider>
        </IntlProvider>
      </Suspense>,
      rootEl
    );
  }

  return Page;
};
