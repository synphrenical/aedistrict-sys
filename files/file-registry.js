/**
 * AE DISTRICT FILE REGISTRY
 * 
 * Add new files here. Directory page auto-populates from this registry.
 * Format:
 * {
 *   name: "DISPLAY_NAME.FRX",
 *   path: "name.frx/",
 *   url: "/aedistrict-sys/files/name/",
 *   pinned: true/false  // optional, defaults to false
 * }
 */

const FILE_REGISTRY = [
  {
    name: "DROOG.FRX",
    path: "droog.frx/",
    url: "/aedistrict-sys/files/droog/",
    pinned: true
  },
  {
    name: "BECK.FRX",
    path: "beck.frx/",
    url: "/aedistrict-sys/files/beck/",
    pinned: true
  },
  {
    name: "SYNPH.FRX",
    path: "synph.frx/",
    url: "/aedistrict-sys/files/synph/",
    pinned: false
  },
  {
    name: "MIRE.FRX",
    path: "mire.frx/",
    url: "/aedistrict-sys/files/mire/",
    pinned: false
  }
  // Add new files here:
  // {
  //   name: "NEWFILE.FRX",
  //   path: "newfile.frx/",
  //   url: "/aedistrict-sys/files/newfile/",
  //   pinned: false
  // }
];
