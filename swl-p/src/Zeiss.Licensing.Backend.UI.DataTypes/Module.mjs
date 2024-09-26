// Submodule class

export class Submodule {
  constructor(name = "", route = "", icon = "zi-home-startscreen") {
    this.name = name;

    this.route = route;

    this.icon = icon;
  }
}

export class Module_Sub {
  constructor(route = "", displayname = "", icon = "") {
    this.name = displayname;

    this.route = route;

    this.submodules = [];

    this.icon = icon;
  }

  addSubmodule(name, route, icon) {
    this.submodules.push(new Submodule(name, `${this.route}/${route}`, icon));
  }
}
