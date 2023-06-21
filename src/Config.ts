class Config {
    origin: string;
    hostName:string;
  
    constructor() {
      // debug in npm
      // this.origin = "http://localhost";
      // this.hostName = "localhost";
  
      // production
      this.origin = window.location.origin
      this.hostName = window.location.host;
    }
  }
  
  export default new Config();