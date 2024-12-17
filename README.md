# iris-global-editor

This is a VSCode Plug-in to do CRUD operations over InterSystems IRIS Globals.

## Installation procedures

1. Get an InterSystems IRIS server to use 
2. Install this REQUIRED application into your IRIS instance: https://github.com/yurimarx/iris-global-yaml
3. Return to the VSCODE
4. Go to Extensions
5. On the Extensions tab, click the button ...
6. Select the option install from vsix... ([VSIX Installation](https://github.com/yurimarx/iris-global-editor/blob/master/images/install.png)\)
7. Select the file iris-global-editor-0.0.2.vsix (install the 0.0.2 version, previous version was iris-global-editor-0.0.1.vsix)
8. Go to menu View > Explorer
9. Now a new section InterSystems IRIS Globals is available
10. Config the host and credentials on .vscode/settings.json, including this content (change host, namespace, username, password with your valid values):
    "conf.irisGlobalEditor.serverconfig": {
      "host": "http://localhost:52773",
      "namespace": "USER",
      "username": "_SYSTEM",
      "password": "SYS"
    }

## Tutorial 
Go to https://community.intersystems.com/post/edit-your-globals-vscode-and-yaml 

## Features

### Treeview with InterSystems IRIS namespace global list

\!\[Namespace Global List\]\([images](https://github.com/yurimarx/iris-global-editor/blob/master/images/treeview.png\)

### CRUD operations over InterSystems Globals

\!\[CRUD over Globals\]\([images](https://github.com/yurimarx/iris-global-editor/blob/master/images/crud.png\)

### Edit/Create InterSystems IRIS Globals using YAML language

\!\[Globals with YAML\]\([images]\(https://github.com/yurimarx/iris-global-editor/blob/master/images/install.png)yaml.png\)

## Requirements

This extension requires an InterSystems IRIS server with this application installed: https://github.com/yurimarx/iris-global-yaml

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `iris-global-editor.enable`: Enable/disable this extension.

## Known Issues

No issues.

## Release Notes

### 0.0.1

Initial release 

### 0.0.2

Filter global list

**Enjoy!**
