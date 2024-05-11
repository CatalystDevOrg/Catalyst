{
  description = "Catalyst Browser Flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = { self, nixpkgs }: {
    packages.x86_64-linux.catalyst3 = nixpkgs.legacyPackages.x86_64-linux.callPackage ./package.nix { };
    defaultPackage.x86_64-linux = self.packages.x86_64-linux.catalyst3;
  };
}
