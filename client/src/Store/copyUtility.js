function preserve(target: any, key: string) {
  const prototype = Object.getPrototypeOf(target);
  if (!prototype.preservedProps) {
    Object.defineProperty(prototype, "preservedProps", {
      value: [],
    });
  }

  prototype.preservedProps.push(key);
}

function getPreservedProps(object: Object) {
  const prototype = Object.getPrototypeOf(object);
  return prototype.preservedProps;
}

function entityToStore(source: Object, target: Object) {
  target["id"] = source["id"];
  const preservedProps = getPreservedProps(target);
  if (preservedProps) {
    preservedProps.forEach((prop) => (target[prop] = source[prop]));
  }
}

function storeToBody(source: Object, target: Object) {
  const preservedProps = getPreservedProps(source);
  if (preservedProps) {
    preservedProps.forEach((prop) => (target[prop] = source[prop]));
  }
}

function storeToForm(source: Object, target: Object) {
  const preservedProps = getPreservedProps(source);
  if (preservedProps) {
    preservedProps.forEach((prop) => {
      if (typeof source[prop] === "number") {
        target[prop] = source[prop].toString();
      } else {
        target[prop] = source[prop];
      }
    });
  }
}

function formToStore(source: Object, target: Object) {
  const preservedProps = getPreservedProps(source);
  if (preservedProps) {
    preservedProps.forEach((prop) => {
      if (typeof target[prop] === "number") {
        target[prop] = parseInt(source[prop]);
      } else {
        target[prop] = source[prop];
      }
    });
  }
}

export { preserve, storeToForm, formToStore, storeToBody, entityToStore };
