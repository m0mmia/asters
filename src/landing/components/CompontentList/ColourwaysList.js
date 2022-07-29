import React from "react";
import { assetUrl } from "../../../utils";
import { DiscoverCard } from "../DiscoverCard";

export default () => {
    return (
        <div>
            <h2>More colourways:</h2>
            <hr/>
                <h3>Discover card:</h3>
                <DiscoverCard imageMobile={`${assetUrl('/images/karlkani2/discoverMobile.png')}`} image={`${assetUrl('/images/karlkani2/discoverBackground.png')}`}/>
            <hr/>
        </div>
    );
}
