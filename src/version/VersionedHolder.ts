import {VersionedObject} from './VersionedObject';
import {VersionedReference} from "./VersionedReference";

/**
 * Gives an object a version number to allow reference holders to determine if the object has changed.
 * This is an efficient game-loop alternative to an Event system. There is no need to subscribe or unsubscribe.
 * Call createReference() to create a reference, and throw away (stop referencing) the reference when you no longer
 * need it.
 */
export class VersionedHolder<T> implements VersionedObject<T> {

    private value: T;
    private version: number;

    constructor(initialValue: T) {
        this.value = initialValue;
        this.version = 0;
    }

    public getVersion(): number {
        return this.version;
    }

    public setObject(value: T): void {
        this.value = value;

        this.incrementVersion();
    }

    public updateObject(value: T): boolean {
        if (this.value == value) {
            return false;
        }

        if (this.value != null && this.value === value) {
            return false;
        }

        this.setObject(value);

        return true;
    }

    public incrementVersion(): void {
        this.version++;
    }

    public getObject(): T {
        return this.value;
    }

    public createReference(): VersionedReference<T> {
        return new VersionedReference<T>(this);
    }
}
