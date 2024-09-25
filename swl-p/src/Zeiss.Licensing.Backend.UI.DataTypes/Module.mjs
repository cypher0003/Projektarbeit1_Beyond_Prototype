// Submodule class

export class Submodule {
  // Konstruktor

  constructor(name = "", route = "", icon = "zi-home-startscreen") {
    this.name = name;

    this.route = route;

    this.icon = icon;
  }
} // Module class

export class Module_Sub {
  // Konstruktor

  constructor(route = "", displayname = "", icon = "") {
    this.name = displayname; // Nicht Teil der URI, Name des Links in der Navigation

    this.route = route; // Teil der URI

    this.submodules = [];

    this.icon = icon;
  } // Methode zum Hinzufügen von Submodulen

  addSubmodule(name, route, icon) {
    this.submodules.push(new Submodule(name, `${this.route}/${route}`, icon));
  }
}
