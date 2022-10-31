import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/assets.css";
import "sanitize.css/typography.css";
import "sanitize.css/page.css";

import {Provider, teamsTheme, teamsDarkV2Theme, teamsHighContrastTheme, ThemePrepared} from '@fluentui/react-northstar';
import {MDXProvider} from '@mdx-js/react'
import type {AppProps} from 'next/app'
import router from 'next/router';
import React, {useEffect, useState} from "react";

import Layout from "../components/Layout";
import { checkInTeams } from "../utils";
import ExternalLink from "../components/ExternalLink";
import BaseImage from "../components/BaseImage";
import {app, version} from "@microsoft/teams-js";

const localeRouteMap : {[key: string]: string} = {
    'en': 'en',
    'es': 'es',
    'de': 'de',
    'fr': 'fr',
    'pt': 'pt',
    'zh': 'zh',
}

/**
 * Custom markdown components
 */
const components = {
    a: ExternalLink,
    img: BaseImage,
}

function MyApp({Component, pageProps}: AppProps) {
    const [locale, setLocale] = useState<string | undefined>(undefined);
    const [theme, setTheme] = useState<ThemePrepared>(teamsTheme);

    useEffect(() => {
        const themeChangeHandler = (theme: string | undefined) => {
            switch (theme) {
                case 'dark':
                    setTheme(teamsDarkV2Theme);
                    break;
                case 'contrast':
                    setTheme(teamsHighContrastTheme);
                    break;
                case 'default':
                default:
                    setTheme(teamsTheme);
            }
        };

        const loadTeamsSdk = async () => {
            const {app, version} = await import('@microsoft/teams-js')

            await app.initialize();
            app.registerOnThemeChangeHandler(themeChangeHandler);
            const {app: appInfo} = await app.getContext();
            themeChangeHandler(appInfo.theme);
            setLocale(appInfo.locale);
            console.log(`Teams SDK version: ${version}`);
            console.log(`Teams language: ${appInfo.locale}`);
            const locale = appInfo.locale?.split('-')[0] ?? 'en';

            if (locale !== 'en' && localeRouteMap[locale]) {
                router.push(`/${localeRouteMap[locale]}`);
            }
        };

        if (checkInTeams()) {
            console.log('Running inside teams...');
            loadTeamsSdk()
        }

    }, [])

    return (
        <Provider theme={theme} styles={{paddingTop: '1em', backgroundColor: 'transparent !important'}}>
            <Layout description={`Barista for Microsoft Teams ${locale ?? 'undefined'}`}
                    pageTitle="Barista for Microsoft Teams">
                <MDXProvider components={components}>
                    <Component {...pageProps} />
                </MDXProvider>
            </Layout>
        </Provider>
    )
}

export default MyApp
