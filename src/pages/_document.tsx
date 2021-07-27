import {ReactElement} from 'react';
import Document, {DocumentContext, Head, Html, Main, NextScript,} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        return await Document.getInitialProps(ctx);
    }

    render(): ReactElement {
        return (
            <Html>
                <Head />
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;