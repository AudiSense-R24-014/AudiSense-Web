@echo off

echo "---------------------------------"
echo "      Cleaning up the project    "
echo "---------------------------------"

rem Check if node_modules exists and 
if exist "node_modules" (
    rem Remove the node_modules directory
    rmdir /s /q "node_modules"
    echo Node modules deleted.
) else (
    echo No node_modules directory found.
)

rem Check if pnpm-lock.yaml exists and
if exist "pnpm-lock.yaml" (
    rem Remove the pnpm-lock.yaml file
    del "pnpm-lock.yaml"
    echo Pnpm lock deleted.
) else (
    echo No pnpm-lock.yaml file found.
)

rem Check if package-lock.json exists and
if exist "package-lock.json" (
    rem Remove the package-lock.json file
    del "package-lock.json"
    echo Package lock deleted.
) else (
    echo No package-lock.json file found.
)