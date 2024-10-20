{
  description = "A Nix-flake-based Node.js development environment";

  inputs.nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1.*.tar.gz";

  outputs = { self, nixpkgs }:
    let
      overlays = [
        (final: prev: rec {
          nodejs = prev.nodejs_latest;
          pnpm = prev.nodePackages.pnpm;
        })
      ];
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forEachSupportedSystem = f: nixpkgs.lib.genAttrs supportedSystems (system: f {
        pkgs = import nixpkgs { inherit overlays system; };
      });
    in
    {
      devShells = forEachSupportedSystem ({ pkgs }: {
        default = pkgs.mkShell {
          packages = (with pkgs;
            [
              nodejs python3 libcxx systemd libpulseaudio libdrm mesa stdenv.cc.cc
              alsa-lib atk at-spi2-atk at-spi2-core cairo cups dbus expat fontconfig
              freetype gdk-pixbuf glib glibc gtk3 libnotify libuuid nspr nss pango systemd
              libappindicator-gtk3 libdbusmenu libxkbcommon zlib
            ]
          ) ++ (with pkgs.xorg;
          [
            libXScrnSaver libXrender libXcursor libXdamage libXext libXfixes libXi
            libXrandr libX11 libXcomposite libxshmfence libXtst libxcb
          ]
          );
        };
      });
    };
}
