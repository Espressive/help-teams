import React from 'react';
import Head from "next/head";
import Header from "./Header";

interface LayoutProps {
    children: React.ReactNode,
    description: string,
    pageTitle: string,
}

export default function Layout({children, pageTitle, description}: LayoutProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta charSet="utf-8"/>
                <meta name="Description" content={description}/>
                <title>{pageTitle}</title>
            </Head>
            <Header/>
            <main>
                {children}
            </main>
        </>
    );
}