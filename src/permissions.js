function getPermissions() {
    return JSON.parse(localStorage.getItem('permissions') || '{}')
}

function getPermission(url, permission) {
    permissions = getPermissions();
    if (url in permissions) {
        if (permission in permissions[url]) {
            if (permissions[url][permission] == true) {
                return true;
            } else {
                return false;
            }
        } else {
            return "unset";
        }
    } else {
        return "unset";
    }
}

function setPermission(url, permission, value) {
    newJson = {
    [url]: {
            [permission]: value
        }
    };
    updatePermissions(newJson);
}

function updatePermissions(newJson) {
    currentJson = getPermissions();
    finalJson = {
        ...currentJson,
        ...newJson
    };
    localStorage.setItem('permissions', JSON.stringify(finalJson));
};


function handlePermissionRequest(url, permission) {
    urlBase = url.split('/')[2];
    if (getPermission(urlBase, permission) == true) {
        return true;
    } else if (getPermission(urlBase, permission) == "unset") {
        userResponse = confirm(`Page ${url} would like to access permission ${permission}`)
        setPermission(urlBase, permission, userResponse)
        return userResponse;
    }  else if (getPermission(url, permission) == false) {
        return false;
    }
}