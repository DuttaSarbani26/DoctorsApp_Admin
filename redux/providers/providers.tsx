"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
// import { SessionProvider } from "next-auth/react";
import { store } from "../store/store";

type ProvidersProps = {
    children: React.ReactNode;
};
export default function Providers({children}: ProvidersProps){
    return(
        <>
        {/* <SessionProvider> */}
        <Provider store={store}>{children}
            <Toaster position="top-center"
            theme="dark"
            richColors
            duration={3000}/>
        </Provider>
        {/* </SessionProvider> */}
        </>
    );
}