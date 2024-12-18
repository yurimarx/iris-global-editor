import * as vscode from 'vscode';
import * as path from 'path';
import {fileFromPath} from 'formdata-node/file-from-path';
import { log } from 'console';
import axios, { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';

export class IrisGlobalsTreeProvider implements vscode.TreeDataProvider<IrisGlobal> {

  constructor(private context: vscode.ExtensionContext) {}

  baseURL: string = "/iris-global-yaml";
  
  private _onDidChangeTreeData: vscode.EventEmitter<IrisGlobal | undefined | null | void> = new vscode.EventEmitter<IrisGlobal | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<IrisGlobal | undefined | null | void> = this._onDidChangeTreeData.event;
  
  public refresh() {
		this._onDidChangeTreeData.fire(undefined);
	}

  public async delete(globalname: string) {
    
    const cfgValues:any = await this.getIrisGlobalsConfig();

    const headers: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(cfgValues.username + ":" + cfgValues.password)
      } as RawAxiosRequestHeaders,
    };
    
    const client = axios.create({
      baseURL: cfgValues.host + this.baseURL,
    });

    const globalParts = globalname.split(":", 2);

    const requestString = "/globals/" + cfgValues.namespace + "/" + globalParts[0].trim();
    
    const globalsYaml: AxiosResponse = await client.delete(requestString, headers);
    
    if (globalsYaml.status === 200) {
      vscode.window.showInformationMessage("Global successfully deleted");
    } else {
      vscode.window.showErrorMessage("Error on try to delete Global. Error: " + globalsYaml.statusText);
    }
  }

  private async getIrisGlobalsConfig() {
    
    try {
      const configuration = await vscode.workspace.getConfiguration('');
      return configuration.get('conf.irisGlobalEditor.serverconfig');
    } catch (error) {
      log(error);
      return null;
    }

  }

  public async add() {

    let selectedText = "";

    const addInput = await vscode.window.showInputBox({
      placeHolder: "GlobalName: Value",
      prompt: "Enter de name of the new Global and its value", 
      value: selectedText
    });
    
    if(addInput === '' || addInput === undefined){
      console.log(addInput);
      vscode.window.showErrorMessage('A Global Name and Value is mandatory to execute this action');
    } else {
      vscode.window.showInformationMessage(addInput!);
    }

    const cfgValues:any = await this.getIrisGlobalsConfig();

    const headers: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(cfgValues.username + ":" + cfgValues.password)
      } as RawAxiosRequestHeaders,
    };
    
    const client = axios.create({
      baseURL: cfgValues.host + this.baseURL,
    });

    const inputParts = addInput === undefined ? [] : addInput.split(':', 2);
    
    const requestString = "/globals/" + cfgValues.namespace + "/" + inputParts[0].trim() + "?globalvalue=" + inputParts[1].trim();
    
    const globalsYaml: AxiosResponse = await client.put(requestString, "{}", headers);
    
    if (globalsYaml.status === 200) {
      vscode.window.showInformationMessage("Global successfully assigned");
    } else {
      vscode.window.showErrorMessage("Error while Global assigned. Error: " + globalsYaml.statusText);
    }

  }

  public async edit(globalvalue: string) {

    let selectedText = globalvalue;

    const addInput = await vscode.window.showInputBox({
      placeHolder: "GlobalName: Value",
      prompt: "Enter de name of the selected Global and its value", 
      value: selectedText
    });
    
    if(addInput === '' || addInput === undefined){
      console.log(addInput);
      vscode.window.showErrorMessage('A Global Name and Value is mandatory to execute this action');
    } else {
      vscode.window.showInformationMessage(addInput!);
    }

    const cfgValues:any = await this.getIrisGlobalsConfig();

    const headers: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(cfgValues.username + ":" + cfgValues.password)
      } as RawAxiosRequestHeaders,
    };
    
    const client = axios.create({
      baseURL: cfgValues.host + this.baseURL,
    });

    const inputParts = addInput === undefined ? [] : addInput.split(':', 2);
    
    const requestString = "/globals/" + cfgValues.namespace + "/" + inputParts[0].trim() + "?globalvalue=" + inputParts[1].trim();
    
    const globalsYaml: AxiosResponse = await client.put(requestString, "{}", headers);
    
    if (globalsYaml.status === 200) {
      vscode.window.showInformationMessage("Global successfully assigned");
    } else {
      vscode.window.showErrorMessage("Error while Global assigned. Error: " + globalsYaml.statusText);
    }

  }

  public async saveGlobalWithYaml(filename: string) {
    
    if(filename.endsWith('.yml')) {
      const cfgValues:any = await this.getIrisGlobalsConfig();
  
      const headers: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Basic ' + btoa(cfgValues.username + ":" + cfgValues.password)
        } as RawAxiosRequestHeaders,
      };
      
      const client = axios.create({
        baseURL: cfgValues.host + this.baseURL
      });
  
      const requestString = "/globals/" + cfgValues.namespace;
      
      const formData = new FormData();
      formData.append('file', await fileFromPath(filename));
      
      try {
        const globalsYaml: AxiosResponse = await client.post(requestString, formData, headers);
    
        if (globalsYaml.statusText === "OK") {
          vscode.window.showInformationMessage("File " + filename + "sent with success and global saved");
        } else {
          vscode.window.showErrorMessage("Error while send yml file. Error: " + globalsYaml.statusText);
        }
      } catch (error) {
        vscode.window.showErrorMessage("Error while send yml file. Error: " + error);
      }

    }

  }

  public async editText(globalvalue: string) {

    const cfgValues:any = await this.getIrisGlobalsConfig();

    const headers: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(cfgValues.username + ":" + cfgValues.password)
      } as RawAxiosRequestHeaders,
    };
    
    const client = axios.create({
      baseURL: cfgValues.host + this.baseURL
    });

    const inputParts = globalvalue === undefined ? [] : globalvalue.split(':', 2);
    
    const requestString = "/globals/yaml/" + cfgValues.namespace + "/" + inputParts[0].trim();
    
    const globalsYaml: AxiosResponse = await client.get(requestString, headers);
    
    if (globalsYaml.status === 200) {
      vscode.workspace.openTextDocument({
        language: 'yaml',
        content: globalsYaml.data
      });
    } else {
      vscode.window.showErrorMessage("Error while get Global text content. Error: " + globalsYaml.statusText);
    }

  }

  getTreeItem(element: IrisGlobal): vscode.TreeItem {
    return element;
  }

  getChildren(element?: IrisGlobal): Thenable<IrisGlobal[]> {
      
    return Promise.resolve(this.getGlobals());
      
  }

  async filterGlobals() {
    
    const configuration = await vscode.workspace.getConfiguration('');
    var filter: string = configuration.get('conf.irisGlobalEditor.filter')!;
    
    var selectedText = filter;

    const addInput = await vscode.window.showInputBox({
      prompt: "Enter the filter to global name (partial name of global)",
      value: selectedText
    });
    
    if(addInput === undefined){
      console.log(addInput);
      vscode.window.showErrorMessage('A filter value is mandatory to execute this action');
    } else {
      await vscode.workspace.getConfiguration().update('conf.irisGlobalEditor.filter', addInput);
      this.getGlobals();
      this.refresh();
      vscode.window.showInformationMessage('Filtered with success');
    }

  }

  async getGlobals(): Promise<IrisGlobal[]> {

    let response: IrisGlobal[] = [];

    const cfgValues:any = await this.getIrisGlobalsConfig();

    const headers: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(cfgValues.username + ":" + cfgValues.password)
      } as RawAxiosRequestHeaders,
    };
    
    const client = axios.create({
      baseURL: cfgValues.host + this.baseURL,
    });

    const globalsYaml: AxiosResponse = await client.get("/globals/" + cfgValues.namespace, headers);

    var arr = globalsYaml.data.split("\r\n");
    if(arr.length > 0 && arr[0] === "# IRIS-Global-YAML") {
      arr.splice(0, 1);
    }
    const configuration = await vscode.workspace.getConfiguration('');
    var filter: string = configuration.get('conf.irisGlobalEditor.filter')!;
    
    if(filter !== undefined && filter !== null && filter !== "") {
      arr = arr.filter((el: string) => el.toLowerCase().includes(filter!.toLowerCase()));
    } 

    for (var i = 0; i < arr.length; i++) {
      const value = (arr[i] as string).trim();

      if(value !== "") {
        const item: IrisGlobal = {
          label: value,
          version: '1.0',
          collapsibleState: vscode.TreeItemCollapsibleState.None,
          iconPath: {
            light: this.context.asAbsolutePath(path.join('resources', 'light', 'dependency.svg')),
            dark: this.context.asAbsolutePath(path.join('resources', 'dark', 'dependency.svg'))
          }
        };
        response.push(item);
      }
      
    }
    
    return response;
    
  }

}


export class IrisGlobal extends vscode.TreeItem {
  
  constructor(
		public readonly label: string,
		public readonly version: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly iconPath: any
	) {
		super(label, collapsibleState);
    this.tooltip = `${this.label}-${this.version}`;
		this.description = this.description;
    this.iconPath = iconPath;
    this.contextValue = 'irisGlobals';
	}

  

}
