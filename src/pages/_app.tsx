import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/assets.css";
import "sanitize.css/typography.css";
import "sanitize.css/page.css";

import {Provider, teamsTheme, teamsDarkV2Theme, teamsHighContrastTheme, ThemePrepared} from '@fluentui/react-northstar';
import {MDXProvider} from '@mdx-js/react'
import type {AppProps} from 'next/app'
import Image, {ImageProps} from 'next/image'
import {useEffect, useState} from "react";

import Layout from "../components/Layout";
import {checkInTeams} from "../utils";

const MIN_SIZE = 200;

/**
 * Custom markdown components
 */
const components = {
    img: (props: ImageProps) => {
        const normalized = {...props};

        if (!props.width) {
            normalized.width = props.height ? props.height : MIN_SIZE;
        }
        if (!props.height) {
            normalized.height = props.width ? props.width : MIN_SIZE;
        }
        return <Image {...normalized} objectFit={'contain'}/>
    },
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
        <Provider theme={theme} styles={{paddingTop: '1em', backgroundColor: 'transparent'}}>
            <Layout description="Barista for Microsoft Teams" pageTitle="Barista for Microsoft Teams">
                <MDXProvider components={components}>
                    <Component {...pageProps} />
                </MDXProvider>
            </Layout>
        </Provider>
    )
}

export default MyApp
