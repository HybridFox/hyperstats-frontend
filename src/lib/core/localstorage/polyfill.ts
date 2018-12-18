// TODO: add StorageEvent support, see https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent

export class MemoryStorage {
  public get length(): number {
    return this.store.size;
  }

  public get storage(): any {
    return Array.from(this.store.entries()).reduce((acc, curr: [string, any]) => ({
      ...acc,
      [curr[0]]: curr[1],
    }), {});
  }

  private store = new Map();

  public key(index: number): any {
    return Array.from(this.store.keys())[index];
  }

  public getItem(key: string): any {
    // Reason for || null: Map object returns undefined on not found key.
    // JSON.parse crashes on undefined, not on null.
    return this.store.get(key) || null;
  }

  public setItem(key: string, value: any): void {
    this.store.set(key, value);
  }

  public removeItem(key: string): void {
    this.store.delete(key);
  }

  public clear(): void {
    this.store.clear();
  }
}
