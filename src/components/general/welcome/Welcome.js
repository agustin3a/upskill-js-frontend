import React from 'react';
import WelcomeBanner from  "./WelcomeBanner";
import FeaturesBanner from "./FeaturesBanner";
import DeviceMockup  from "./DeviceMockup";


function Welcome() {
    return (
        <>
            <WelcomeBanner />
            <FeaturesBanner />
            <DeviceMockup />
        </>
    )
}

export default Welcome
