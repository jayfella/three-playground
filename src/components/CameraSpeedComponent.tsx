import * as React from 'react';
import {threeJsApp} from "../three/ThreeJsApplication";
import {CameraControlsState} from "../states/CameraControlsState";

export function CameraSpeedComponent(): JSX.Element {
    const cameraControlsState = threeJsApp.getStateManager().getState(CameraControlsState);
    const [ camSpeed, setCamSpeed ] = React.useState<number>(5);

    React.useEffect(() => {
        setCamSpeed(cameraControlsState.getMovementSpeed());
    }, [])

    const camSpeedChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);

        cameraControlsState.setMovementSpeed(newValue);
        setCamSpeed(newValue);
    }

    return (
        <div className="card" id='cam-controls'>
            <div className="card-header">
                Camera Speed
            </div>
            <div className="card-body">
                <input type='range' min='5' max='50' value={camSpeed} onChange={camSpeedChanged} />
            </div>
        </div>
    );
}
