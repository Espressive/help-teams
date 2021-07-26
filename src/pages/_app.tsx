import "sanitize.css";
import "sanitize.css/forms.css";
import "sanitize.css/assets.css";
import "sanitize.css/typography.css";
import "sanitize.css/page.css";

import type {AppProps} from 'next/app'
import Layout from "../components/Layout";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Layout description="Barista for Teams Help" pageTitle="Barista for Teams Help">
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp
