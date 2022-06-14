%global srcname catalyst

Name: catalyst
Version: 3.1.1
Release: 1%{?dist}
License: MIT
Summary: Free and open source Electron browser
Url: https://pagure.io/%{srcname}
# Sources can be obtained by
# git clone https://pagure.io/copr-tito-quickdoc
# cd copr-tito-quickdoc
# tito build --tgz
Source0: %{name}-%{version}.tar.gz

BuildArch: noarch

%if 0%{?el6}
BuildRequires: 
BuildRequires: 
%else
BuildRequires: 
%endif

%description
Hellocopr is a very simple demonstration program that does nothing but display
some text on the command line. It is used as an example for automatic RPM
packaging using tito and Fedora's Copr user repository.

#-- PREP, BUILD & INSTALL -----------------------------------------------------#
%prep
%autosetup

%build
%py3_build

%install
%py3_install

#-- FILES ---------------------------------------------------------------------#
%files
%doc README.md
%license LICENSE
%{_bindir}/hellocopr
%{python3_sitelib}/%{name}-*.egg-info/
%{python3_sitelib}/%{name}/

#-- CHANGELOG -----------------------------------------------------------------#
%changelog
* Fri Jul 24 2020 Christopher Engelhard <ce@lcts.de> 1.0.2-1
- let tito manage the version string (ce@lcts.de)

* Fri Jul 24 2020 Christopher Engelhard <ce@lcts.de> 1.0.1-1
- single-source program version (ce@lcts.de)

* Fri Jul 24 2020 Christopher Engelhard <ce@lcts.de> 1.0.0-1
- new package built with tito


