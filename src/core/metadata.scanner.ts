type MethodScanned = {
  descriptor: { path: string; methods: string[] }
  method: any
}

export class MetadataScanner {
  /**
   * Scans for metadata with the given metadataKey for all functions
   * in a class
   */
  public static scan<T, Y>(obj: T, metadataKey: string): MethodScanned[] {
    const methods: MethodScanned[] = []
    Object.getOwnPropertyNames(obj).forEach(name => {
      if (typeof obj[name] === 'function' && name !== 'constructor') {
        const methodDescriptor = Reflect.getMetadata(metadataKey, obj[name])
        if (methodDescriptor) {
          methods.push({
            descriptor: methodDescriptor,
            method: obj[name]
          })
        }
      }
    })

    return methods
  }

  public static scanClass<T>(obj: any, metadataKey: string): T {
    return Reflect.getMetadata(metadataKey, obj) as T
  }
}
