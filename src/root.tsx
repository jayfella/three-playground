import * as React from 'react';
import { ThreeJsComponent } from "./components/ThreeJsComponent";
import {threeJsApp} from "./three/ThreeJsApplication";
import {CameraReticleState} from "./states/CameraReticleState";
import {CameraControlsState} from "./states/CameraControlsState";
import {ThreeStatsState} from "./states/ThreeStatsState";
import {CameraSpeedComponent} from "./components/CameraSpeedComponent";
import './css/style.css';
import {OrbitAroundPositionState} from "./examples/OrbitAroundPositionState";
import {MovingSineWave} from "./examples/MovingSineWave";

export class Root extends React.Component {
    render() {

        threeJsApp.getStateManager().attach(new CameraReticleState());
        threeJsApp.getStateManager().attach(new CameraControlsState());
        threeJsApp.getStateManager().attach(new ThreeStatsState());

        threeJsApp.getStateManager().attach(new OrbitAroundPositionState());
        threeJsApp.getStateManager().attach(new MovingSineWave());

        return (
            <>
                <ThreeJsComponent/>
                <CameraSpeedComponent/>
            </>
        );
    }
}
