export function WatchPropertyChange<T = any>(
  callback: (newValue: T, oldValue: T) => void
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    const privatePropertyKey = `__${String(propertyKey)}__`; // Tên thuộc tính ẩn để lưu giá trị gốc

    // Thêm một thuộc tính ẩn để lưu giá trị gốc
    Object.defineProperty(target, privatePropertyKey, {
      value: undefined,
      writable: true,
      configurable: true,
    });

    // Định nghĩa lại getter và setter cho thuộc tính
    Object.defineProperty(target, propertyKey, {
      get(): T {
        return this[privatePropertyKey];
      },
      set(newValue: T) {
        console.log("🚀 ~ set ~ newValue:", newValue)
        const oldValue = this[privatePropertyKey];
        if (newValue !== oldValue) {
          this[privatePropertyKey] = newValue;
          callback.call(this, newValue, oldValue); // Gọi callback khi giá trị thay đổi
        }
      },
      enumerable: true,
      configurable: true,
    });
  };
}
