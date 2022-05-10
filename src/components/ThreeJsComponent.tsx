import * as React from 'react';
import { threeJsApp } from "../three/ThreeJsApplication";

let mount: any;

export function ThreeJsComponent(): JSX.Element {
    React.useEffect(() => {
        mount.appendChild(threeJsApp.getRenderer().domElement);

        // fake a resize event to get the canvas to fill the page.
        window.dispatchEvent(new Event('resize'));

        // threeJsApp.getWidgetFactory().setDrawDirectionsEnabled(true);
    }, [])

    return <div ref={ref => (mount = ref)}/>;
}
