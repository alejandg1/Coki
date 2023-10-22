module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-wix',
      config: {
        language: 1033,
        name: "ActioMeta",
        manufacturer: 'Mikandro',
        exe: "ActioMeta",
        icon: "./images/logo.ico"
      }
    },
    {
      name: "@electron-forge/maker-zip",
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          icon: "./images/logo.png"
        }
      },
    },
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        setupIcon: "./images/logo.ico",
        certificateFile: "./cert.pfx",
        certificatePassword: process.env.CERTIFICATE_PASSWORD,
      },
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        name: "ActioMeta",
        icon: "./images/logo.icns",
        iconSize: 20,
        format: 'ULFO'
      }
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};
