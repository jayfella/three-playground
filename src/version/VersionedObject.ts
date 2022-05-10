import { VersionedReference } from './VersionedReference';

export interface VersionedObject<T> {
    getVersion(): number;
    getObject(): T;
    createReference(): VersionedReference<T>;
}
