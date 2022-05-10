import { VersionedObject } from './VersionedObject';

export class VersionedReference<T> {
    private object: VersionedObject<T>;
    private lastVersion = -1;

    constructor(object: VersionedObject<T>) {
        this.object = object;
        this.lastVersion = object.getVersion();
    }

    public getLastVersion(): number {
        return this.lastVersion;
    }

    public getObjectVersion(): number {
        return this.object.getVersion();
    }

    public needsUpdate(): boolean {
        return this.lastVersion != this.object.getVersion();
    }

    public update(): boolean {
        if (this.lastVersion === this.object.getVersion()) {
            return false;
        }

        this.lastVersion = this.object.getVersion();

        return true;
    }

    public get(): T {
        return this.object.getObject();
    }

}
