import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/assets.css";
import "sanitize.css/typography.css";
import "sanitize.css/page.css";

import {Provider, teamsTheme, teamsDarkV2Theme, teamsHighContrastTheme, ThemePrepared} from '@fluentui/react-northstar';
import {MDXProvider} from '@mdx-js/react'
import type {AppProps} from 'next/app'
import React, {useEffect, useState} from "react";

import Layout from "../components/Layout";
import {checkInTeams} from "../utils";
import ExternalLink from "../components/ExternalLink";
import BaseImage from "../components/BaseImage";

/**
 * Custom markdown components
 */
const components = {
    a: ExternalLink,
    img: BaseImage,
}

function MyApp({Component, pageProps}: AppProps) {

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
            const microsoftTeams = await import('@microsoft/teams-js')

            microsoftTeams.initialize(() => {
                microsoftTeams.registerOnThemeChangeHandler(themeChangeHandler);
                microsoftTeams.getContext(context => {
                    themeChangeHandler(context.theme);
                })
            });
        };

        if (checkInTeams()) {
            console.log('Running inside teams...');
            loadTeamsSdk()
        }

    }, [])

    return (
        <Provider theme={theme} styles={{paddingTop: '1em', backgroundColor: 'transparent !important'}}>
            <Layout description="Barista for Microsoft Teams" pageTitle="Barista for Microsoft Teams">
                <MDXProvider components={components}>
                    <Component {...pageProps} />
                </MDXProvider>
            </Layout>
        </Provider>
    )
}

export default MyApp
