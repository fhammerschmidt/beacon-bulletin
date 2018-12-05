#!/bin/bash
set -e

marker_file='./node_modules/.patched'

if [ -f $marker_file ]; then
    echo "Patches were already applied. To re-apply them, run 'yarn --force' or remove $marker_file!"
    exit
fi

function patchModule {
  patch -d ./node_modules -N -p0 <./scripts/patches/$1
}

patchModule 'react-native-bluetooth-status.patch'
patchModule 'react-native-beacons-manager.patch'

touch $marker_file