const factories = {};

function IdentFactory(name) {
  this.name    = name;
  this.counter = 0;

  this.next = () => `${this.name}_${++this.counter}`;

  return this;
}

export default function identFactory(name) {
  if (!Object.prototype.hasOwnProperty.call(factories, name)) {
    factories[name] = new IdentFactory(name);
  }

  return factories[name];
}
