import { BaseModel } from "./BaseModel.mjs";

export class RefFeature extends BaseModel{ 

    constructor(name = '', version = '') { 
        super();

        this.Name = name; 

        this.Version = version; 

    } 

 

    get Name() { 

        return this.Name; 

    } 

 

    set Name(value) { 

        this.Name = value; 

    } 

 

    get Version() { 

        return this.Version; 

    } 

 

    set Version(value) { 

        this.Version = value; 

    } 

} 