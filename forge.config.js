module.exports = {
    packagerConfig: {
        icon: './assets/icon-scaled',
        asar: true,
    },
    publishers: [
        {
            name: '@electron-forge/publisher-github',
            config: {
                repository: {
                    owner: 'JaydenDev',
                    name: 'Catalyst'
                },
                draft: true
            }
        }
    ],
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'Catalyst3'
            }
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: [
                'darwin'
            ]
        },
        {
            name: '@electron-forge/maker-dmg',
            config: {
                'format': 'ULFO'
            }
        },
        {
            name: '@electron-forge/maker-deb',
            config: {
                options: {
                    icon: './assets/icon.png'
                }
            }
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {}
        },
        {
            name: '@electron-forge/maker-flatpak',
            config: {
                options: {
                    categories: [
                        'Internet'
                    ],
                    id: 'io.github.catalystdevorg.catalyst',
                    productName: 'catalyst'
                }
            }
        }]
};